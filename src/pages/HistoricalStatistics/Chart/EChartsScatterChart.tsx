import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { CSVLink } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes';
import { csvHeaders, themes } from '@utils/constants/statistics';
// import { PrevButton } from '../PrevButton';
import { TScatterChartProps, TThemeColor, TThemeInitOption } from '@utils/constants/types';
import { makeDownloadFileName } from '@utils/helpers/statisticsLib';
import { getThemeInitOption, getThemeUpdateOption } from '@utils/helpers/chartOptions';
import { useUpdatChartTheme } from '@utils/hooks';
import { eChartLineStyles } from './styles';

export const EChartsScatterChart = (props: TScatterChartProps): JSX.Element => {
  const {
    chartName,
    data,
    dataX,
    title,
    info,
    offset,
    period: selectedPeriodButton,
    periods,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props;
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const [csvData, setCsvData] = useState<string | Data>('');
  const [selectedThemeButton, setSelectedThemeButton] = useState(0);
  const [currentTheme, setCurrentTheme] = useUpdatChartTheme();
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>();
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>();
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  useEffect(() => {
    const chartInstance = eChartRef?.getEchartsInstance();
    setEChartInstance(chartInstance);
  }, [eChartRef]);

  useEffect(() => {
    if (data?.length) {
      const dataY = data.reduce((yAxis, item) => {
        yAxis.push(item[1]);
        return yAxis;
      }, []);
      const min = Math.min(...dataY);
      const max = Math.max(...dataY);
      setMinY(min - offset);
      setMaxY(max + offset);
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
          throw new Error(`PNG download error: ${error}`);
        });
    }
  };

  const handleThemeButtonClick = (theme: TThemeColor, index: number) => {
    setCurrentTheme(theme);
    setSelectedThemeButton(index);
    handleBgColorChange(theme.backgroundColor);

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
      return styles.activeButton;
    }
    return '';
  };

  const getActiveThemeButtonStyle = (index: number): string => {
    if (selectedThemeButton === index) {
      return styles.activeThemeButton;
    }
    return '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.lineChartHeader}>
        {/* <PrevButton color="#c3921f" /> */}
        <div className={styles.lineChartTitle} style={{ color: currentTheme?.color }}>
          {title}
        </div>
        <div className={styles.periodSelect}>
          <span style={{ color: currentTheme?.color }}>period: </span>
          {periods.map(period => (
            <button
              className={`${getActivePriodButtonStyle(period)} ${styles.filterButton}`}
              onClick={() => {
                if (handlePeriodFilterChange) {
                  handlePeriodFilterChange(period);
                }
              }}
              type="button"
              key={`button-filter-${period}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.lineChartWrap}>
        <ReactECharts
          notMerge={false}
          lazyUpdate
          option={options}
          className={styles.reactECharts}
          ref={e => setEChartRef(e)}
        />
      </div>
      <div className={styles.lineChartFooter}>
        <div className={styles.lineChartThemeSelect}>
          {themes.map((theme, index) => (
            <button
              className={`${styles.themeSelectButton} ${getActiveThemeButtonStyle(index)}`}
              onClick={() => handleThemeButtonClick(theme, index)}
              style={{
                backgroundColor: `${theme.backgroundColor}`,
              }}
              type="button"
              key={`button-filter-${theme.name}`}
            >
              {'  '}
            </button>
          ))}
        </div>
        <div className={styles.lineChartDownloadButtonBar}>
          <button className={styles.uploadButton} type="button" onClick={downloadPNG}>
            Download PNG
          </button>
          <CSVLink
            data={csvData}
            filename={`${makeDownloadFileName(info.currencyName, chartName)}.csv`}
            headers={csvHeaders[chartName]}
            separator=";"
            ref={downloadRef}
            className={styles.uploadButton}
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};
