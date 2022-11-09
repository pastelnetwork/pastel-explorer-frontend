import { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

import { Data } from 'react-csv/components/CommonPropTypes';
import { makeDownloadFileName } from '@utils/helpers/statisticsLib';
import { csvHeaders, themes } from '@utils/constants/statistics';
import { TLineChartProps, TThemeInitOption, TThemeColor } from '@utils/constants/types';
import { getThemeInitOption, getThemeUpdateOption } from '@utils/helpers/chartOptions';
import { getThemeState } from '@redux/reducers/appThemeReducer';

import { eChartLineStyles } from './styles';
import * as Styles from './Chart.styles';

export const EChartsLineChart = (props: TLineChartProps): JSX.Element => {
  const {
    chartName,
    dataX,
    dataY,
    dataY1,
    dataY2,
    title,
    info,
    offset,
    granularity: selectedGranularityButton,
    period: selectedPeriodButton,
    periods,
    granularities,
    handlePeriodFilterChange,
    handleGranularityFilterChange,
    handleBgColorChange,
    setHeaderBackground,
    isDynamicTitleColor,
    gaugeValue,
    minGaugeValue = 0,
    maxGaugeValue = 100,
    subTitle,
    customHtml,
    isLoading = false,
  } = props;
  const { darkMode } = useSelector(getThemeState);
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const [csvData, setCsvData] = useState<string | Data>('');
  const [selectedThemeButton, setSelectedThemeButton] = useState(0);
  // const [selectedGranularityButton, setSelectedGranularityButton] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(null);
  const [isSelectedTheme, setSelectedTheme] = useState(false);
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>();
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>();
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
    if (dataY?.length) {
      const min = Math.min(...dataY);
      const max = Math.max(...dataY);
      if (chartName === 'mempoolsize') {
        setMinY(Math.floor(min));
        setMaxY(Math.ceil(max));
      } else if (chartName === 'difficulty') {
        setMinY(Math.floor(min / offset) * offset);
        setMaxY(Math.floor(max / offset) * offset);
      } else if (
        ['percentOfPSLStaked', 'totalOfCascadeRequests', 'totalSizeOfDataStored'].indexOf(
          chartName,
        ) !== -1
      ) {
        setMinY(min - offset);
        setMaxY(max + offset);
      } else if (chartName === 'blockchainSize') {
        if (selectedPeriodButton === '24h') {
          setMinY(parseFloat((min - offset).toFixed(1)));
          setMaxY(parseFloat((max + offset).toFixed(1)));
        } else {
          setMinY(Math.floor(min) - offset);
          setMaxY(Math.floor(max) + offset);
        }
      } else {
        setMinY(Math.round(min) - offset);
        setMaxY(Math.floor(max) + offset);
      }
      if (dataX) {
        const data: Data = [];
        dataY.forEach((o, index) => {
          data.push({
            value: o,
            time: dataX[index],
          });
        });
        setCsvData(data);
      }
    } else if (dataY1?.length && dataY2?.length) {
      if (dataX) {
        const data: Data = [];
        dataY1.forEach((yAxis, index) => {
          data.push({
            value: `${yAxis} : ${dataY2[index]}`,
            time: dataX[index],
          });
        });
        setCsvData(data);
      }
    }
  }, [dataX, dataY]);
  const isAverageNFTChart = ['averageRarenessScoreOfNFTsOnSense'].indexOf(chartName) !== -1;
  const params: TThemeInitOption = {
    theme: currentTheme,
    dataX,
    dataY,
    dataY1,
    dataY2,
    chartName,
    minY: isAverageNFTChart ? minGaugeValue : minY,
    maxY: isAverageNFTChart ? maxGaugeValue : maxY,
    gaugeValue,
    period: selectedPeriodButton,
    granularity: selectedGranularityButton,
  };
  const options = getThemeInitOption(params);
  const downloadPNG = () => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef.ele)
        .then(function download(blob: Blob | null) {
          if (blob) {
            saveAs(blob, `${makeDownloadFileName(info.currencyName, chartName)}.png`);
          }
        })
        .catch(function getError(error) {
          throw new Error(`PNG download error: ${error}`);
        });
    }
  };

  const handleThemeButtonClick = (theme: TThemeColor, index: number) => {
    setCurrentTheme(theme);
    setSelectedThemeButton(index);
    handleBgColorChange(theme.backgroundColor);
    setSelectedTheme(true);

    const paramsOption: TThemeInitOption = {
      theme,
      dataX,
      dataY,
      chartName,
      minY: isAverageNFTChart ? minGaugeValue : minY,
      maxY: isAverageNFTChart ? maxGaugeValue : maxY,
      gaugeValue,
      granularity: selectedGranularityButton,
    };
    const option = getThemeUpdateOption(paramsOption);
    eChartInstance?.setOption(option);
  };

  const getActivePriodButtonStyle = (index: string): string => {
    if (selectedPeriodButton === index) {
      return 'active';
    }
    return '';
  };

  const getActiveGranularityButtonStyle = useMemo(
    () => (granularity: string): string => {
      if (selectedGranularityButton === granularity) {
        return 'active';
      }
      return '';
    },
    [selectedGranularityButton],
  );

  const getActiveThemeButtonStyle = (index: number): string => {
    if (selectedThemeButton === index && isSelectedTheme) {
      return 'active';
    }
    return '';
  };

  return (
    <Styles.ChartContainer>
      <Styles.LineChartHeader
        className={`line-chart-header ${setHeaderBackground ? 'has-bg' : ''} ${
          isLoading ? 'no-mb' : ''
        }`}
      >
        {isDynamicTitleColor ? (
          <Styles.ChartTitle style={{ color: currentTheme?.color }}>{title}</Styles.ChartTitle>
        ) : (
          <Styles.ChartTitle>{title}</Styles.ChartTitle>
        )}
        <Styles.ChartFilterWrapper>
          {granularities && (
            <Styles.GranularitySelect>
              <span>Granularity: </span>
              {granularities?.map(granularity => {
                return (
                  <Styles.PeriodButton
                    className={`${getActiveGranularityButtonStyle(granularity)} ${
                      styles.filterButton
                    }`}
                    onClick={() => {
                      if (handleGranularityFilterChange) {
                        handleGranularityFilterChange(granularity);
                      }
                    }}
                    type="button"
                    key={`button-filter-${granularity}`}
                  >
                    {granularity}
                  </Styles.PeriodButton>
                );
              })}
            </Styles.GranularitySelect>
          )}
          {customHtml}
          {periods && periods.length ? (
            <Styles.PeriodSelect>
              <span>Period: </span>
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
          ) : null}
        </Styles.ChartFilterWrapper>
      </Styles.LineChartHeader>
      <Styles.LineChartWrap className={isLoading ? 'no-spacing' : ''}>
        {subTitle ? (
          <Styles.ChartSubTitle style={{ color: currentTheme?.color }}>
            {subTitle}
          </Styles.ChartSubTitle>
        ) : null}
        {isLoading || !dataX?.length ? (
          <Skeleton animation="wave" variant="rect" height={386} />
        ) : (
          <ReactECharts
            notMerge={false}
            lazyUpdate
            option={options}
            className={styles.reactECharts}
            ref={e => {
              setEChartRef(e);
            }}
          />
        )}
      </Styles.LineChartWrap>
      <Styles.LineChartFooter className="line-chart-footer">
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
              {' '}
            </Styles.ThemeButton>
          ))}
        </div>
        <div className={styles.lineChartDownloadButtonBar}>
          <Styles.DonwloadButton type="button" onClick={downloadPNG}>
            Download PNG
          </Styles.DonwloadButton>
          <Styles.CSVLinkButton
            data={csvData}
            filename={`${makeDownloadFileName(info.currencyName, chartName)}.csv`}
            headers={csvHeaders[chartName]}
            separator=","
            ref={downloadRef}
          >
            Download CSV
          </Styles.CSVLinkButton>
        </div>
      </Styles.LineChartFooter>
    </Styles.ChartContainer>
  );
};
