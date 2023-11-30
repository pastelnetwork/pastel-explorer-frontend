import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/lab';
import parse from 'html-react-parser';
import { Headers, Data } from 'react-csv/lib/core';

import { csvHeaders, themes } from '@utils/constants/statistics';
// import { PrevButton } from '../PrevButton';
import { TScatterChartProps, TThemeColor, TThemeInitOption } from '@utils/constants/types';
import {
  makeDownloadFileName,
  generateMinMaxChartData,
  getMinMax,
} from '@utils/helpers/statisticsLib';
import { getThemeInitOption, getThemeUpdateOption } from '@utils/helpers/chartOptions';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import { eChartLineStyles } from './styles';
import * as Styles from './Chart.styles';

export const EChartsScatterChart = (props: TScatterChartProps): JSX.Element => {
  const {
    chartName,
    data,
    dataX,
    title,
    info,
    period: selectedPeriodButton,
    periods,
    handlePeriodFilterChange,
    handleBgColorChange,
    setHeaderBackground,
    isDynamicTitleColor,
    isLoading = false,
  } = props;
  const { height, width } = useWindowDimensions();
  const styles = eChartLineStyles();
  const { darkMode } = useSelector(getThemeState);
  const downloadRef = useRef(null);
  const [csvData, setCsvData] = useState<string | Data>('');
  const [selectedThemeButton, setSelectedThemeButton] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(null);
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>();
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>();
  const [isSelectedTheme, setSelectedTheme] = useState(false);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  useEffect(() => {
    if (isSelectedTheme) {
      setCurrentTheme(currentTheme);
      handleBgColorChange(currentTheme?.backgroundColor || '');
    } else if (darkMode) {
      setCurrentTheme(themes[0]);
      handleBgColorChange(themes[0].backgroundColor);
    } else {
      setCurrentTheme(themes[2]);
      handleBgColorChange(themes[2].backgroundColor);
    }
  }, [darkMode]);

  useEffect(() => {
    const chartInstance = eChartRef?.getEchartsInstance();
    setEChartInstance(chartInstance);
  }, [eChartRef]);

  useEffect(() => {
    if (data?.length && dataX?.length) {
      const dataY = data.reduce((yAxis, item) => {
        yAxis.push(item[1]);
        return yAxis;
      }, []);
      const arr = getMinMax(dataY);
      const min = arr[0];
      const max = arr[1];
      const result = generateMinMaxChartData(min, max, 0, 5, selectedPeriodButton);
      setMinY(result.min);
      setMaxY(result.max);
      const dataCsv: Data = [];
      data.forEach((row, index) => {
        dataCsv.push({
          height: row[0],
          transactions: row[1],
          time: dataX[index],
        });
      });
      setCsvData(dataCsv);
    }
  }, [data]);

  const params: TThemeInitOption = {
    theme: currentTheme,
    data,
    chartName,
    minY,
    maxY,
    height,
    width,
    dataX,
    period: selectedPeriodButton,
  };
  const options = getThemeInitOption(params);
  const downloadPNG = () => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef.ele)
        .then(function success(blob: Blob | null) {
          if (blob) {
            saveAs(blob, `${makeDownloadFileName(info.currencyName, chartName)}.png`);
          }
        })
        .catch(function onError(error) {
          throw new Error(
            `${translateDropdown('pages.historicalStatistics.pngDownloadError')}: ${error}`,
          );
        });
    }
  };

  const handleThemeButtonClick = (theme: TThemeColor, index: number) => {
    setCurrentTheme(theme);
    setSelectedThemeButton(index);
    handleBgColorChange(theme.backgroundColor);
    setSelectedTheme(true);

    const themeInit: TThemeInitOption = {
      theme,
      data,
      minY,
      maxY,
      chartName,
    };
    const option = getThemeUpdateOption(themeInit);
    eChartInstance?.setOption(option);
  };

  const getActivePriodButtonStyle = (index: string): string => {
    if (selectedPeriodButton === index) {
      return 'active';
    }
    return '';
  };

  const getActiveThemeButtonStyle = (index: number): string => {
    if (selectedThemeButton === index && isSelectedTheme) {
      return 'active';
    }
    return '';
  };

  const getCsvHeaders = () => {
    const headers = csvHeaders[chartName];
    return headers.map(header => ({
      ...header,
      label: translateDropdown(header.label as string) as string,
    }));
  };

  return (
    <Styles.ChartContainer>
      <Styles.LineChartHeader
        className={`${setHeaderBackground ? 'has-bg' : ''} ${isLoading ? 'no-mb' : ''}`}
      >
        {isDynamicTitleColor ? (
          <Styles.ChartTitle style={{ color: currentTheme?.color }}>{title}</Styles.ChartTitle>
        ) : (
          <Styles.ChartTitle>{title}</Styles.ChartTitle>
        )}
        <Styles.PeriodSelect>
          <span>{parse(translate('pages.historicalStatistics.period'))}: </span>
          {periods.map(period => (
            <Styles.PeriodButton
              className={getActivePriodButtonStyle(period)}
              onClick={() => {
                if (handlePeriodFilterChange) {
                  handlePeriodFilterChange(period);
                }
              }}
              type="button"
              key={`button-filter-${period}`}
            >
              {period}
            </Styles.PeriodButton>
          ))}
        </Styles.PeriodSelect>
      </Styles.LineChartHeader>
      <Styles.LineChartWrap className={isLoading ? 'no-spacing' : ''}>
        {isLoading || !dataX?.length ? (
          <Styles.LoadingWrapper>
            <Skeleton animation="wave" variant="rectangular" height={386} />
            <Styles.LoadingText>{parse(translate('common.loadingData'))}</Styles.LoadingText>
          </Styles.LoadingWrapper>
        ) : (
          <ReactECharts
            notMerge={false}
            lazyUpdate
            option={options}
            className={styles.reactECharts}
            ref={e => setEChartRef(e)}
          />
        )}
      </Styles.LineChartWrap>
      <Styles.LineChartFooter>
        <div className={styles.lineChartThemeSelect}>
          {themes.map((theme, index) => (
            <Styles.ThemeButton
              className={`${styles.themeSelectButton} ${getActiveThemeButtonStyle(index)}`}
              onClick={() => handleThemeButtonClick(theme, index)}
              style={{
                backgroundColor: `${theme.backgroundColor}`,
              }}
              type="button"
              key={`button-filter-${theme.name}`}
            >
              {'  '}
            </Styles.ThemeButton>
          ))}
        </div>
        <div className={styles.lineChartDownloadButtonBar}>
          <Styles.DonwloadButton type="button" onClick={downloadPNG}>
            {parse(translate('pages.historicalStatistics.downloadPNG'))}
          </Styles.DonwloadButton>
          <Styles.CSVLinkButton
            data={csvData}
            filename={`${makeDownloadFileName(info.currencyName, chartName)}.csv`}
            headers={getCsvHeaders() as Headers}
            separator=","
            ref={downloadRef}
            className={styles.uploadButton}
          >
            {parse(translate('pages.historicalStatistics.downloadCSV'))}
          </Styles.CSVLinkButton>
        </div>
      </Styles.LineChartFooter>
    </Styles.ChartContainer>
  );
};
