import { useState, useEffect, useRef, MouseEvent, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import * as htmlToImage from 'html-to-image';
import * as echarts from 'echarts';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import parse from 'html-react-parser';

import { Data } from 'react-csv/components/CommonPropTypes';
import {
  makeDownloadFileName,
  PeriodTypes,
  generateXAxisInterval,
  getMinMax,
  generateMinMaxChartData,
  toPlainString,
  getYAxisLabel,
} from '@utils/helpers/statisticsLib';
import { pricesCSVHeaders, themes } from '@utils/constants/statistics';
import { TLineChartProps, TThemeColor } from '@utils/constants/types';
import { generateXAxisLabel } from '@utils/helpers/chartOptions';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import { eChartLineStyles } from './styles';
import * as Styles from './Chart.styles';

export const EChartsMultiLineChart = (props: TLineChartProps): JSX.Element => {
  const styles = eChartLineStyles();
  const {
    chartName,
    dataX,
    dataY1,
    dataY2,
    info,
    fixedNum = 5,
    fixedNum1 = 10,
    period: selectedPeriodButton,
    periods = [],
    title,
    seriesName = translateDropdown('pages.historicalStatistics.usdPrice'),
    seriesName1 = translateDropdown('pages.historicalStatistics.btcPrice'),
    yaxisName = translateDropdown('pages.historicalStatistics.usdPrice'),
    yaxisName1 = translateDropdown('pages.historicalStatistics.btcPrice'),
    handlePeriodFilterChange,
    handleBgColorChange,
    setHeaderBackground,
    isDynamicTitleColor,
    seriesName1Type = 'bar',
    isLoading,
    color,
    showLegend = false,
    symbol = '',
    symbol1 = '',
  } = props;
  const downloadRef = useRef(null);
  const { width } = useWindowDimensions();
  const { darkMode } = useSelector(getThemeState);
  const [csvData, setCsvData] = useState<string | Data>('');
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(null);
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>();
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>();
  const [selectedThemeButton, setSelectedThemeButton] = useState(0);
  const [isSelectedTheme, setSelectedTheme] = useState(false);
  const [minY1, setMinY1] = useState(0);
  const [maxY1, setMaxY1] = useState(0);
  const [minY2, setMinY2] = useState(0);
  const [maxY2, setMaxY2] = useState(0);

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
    if (dataY1?.length && dataY2?.length) {
      const arr1 = getMinMax(dataY1);
      const min1 = arr1[0];
      const max1 = arr1[1];
      const arr2 = getMinMax(dataY2);
      const min2 = arr2[0];
      const max2 = arr2[1];

      if (chartName === 'prices') {
        const result1 = generateMinMaxChartData(min1, max1, 10000, 5, selectedPeriodButton, 5);
        setMinY1(result1.min);
        setMaxY1(result1.max);
        const result2 = generateMinMaxChartData(
          min2,
          max2,
          100000000000,
          5,
          selectedPeriodButton,
          10,
        );
        setMinY2(result2.min);
        setMaxY2(result2.max);
      } else if (chartName === 'marketVolumePrice' || chartName === 'marketCapPrice') {
        const result1 = generateMinMaxChartData(min1, max1, 10000, 5, selectedPeriodButton, 5);
        setMinY1(result1.min);
        setMaxY1(result1.max);
        const result2 = generateMinMaxChartData(min2, max2, 0, 5, selectedPeriodButton);
        setMinY2(result2.min);
        setMaxY2(result2.max);
      }
      if (dataX) {
        const data: Data = [];
        dataY1.forEach((o, index) => {
          data.push({
            usd: o,
            btc: dataY2[index],
            time: dataX[index],
          });
        });
        setCsvData(data);
      }
    }
  }, [dataY1, dataY2]);

  let newColor = ['#cd6661', darkMode ? '#1fbfff' : '#5470c6'];
  if (color) {
    newColor = color;
  }
  const options = {
    textStyle: {
      color: currentTheme?.color,
    },
    grid: {
      top: showLegend ? 70 : 50,
      right: 100,
      bottom: 70,
      left: 60,
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter(params: TChartParams[]) {
        let html = '';
        params.forEach(item => {
          let val = !fixedNum
            ? `${symbol}${formatNumber(item.value)}`
            : `${symbol}${toPlainString(item.value)}`;
          if (item.seriesIndex === 1) {
            if (chartName === 'marketVolumePrice') {
              val = `${symbol1}${formatNumber(item.value, { decimalsLength: fixedNum1 })}`;
            } else if (chartName === 'marketCapPrice') {
              val = `${symbol1}${formatNumber(item.value / 1000000, {
                decimalsLength: fixedNum1,
              })}M`;
            } else {
              val = !fixedNum1
                ? `${symbol1}${formatNumber(item.value)}`
                : `${symbol1}${toPlainString(item.value)}`;
            }
          }
          html += `
            <div class="tooltip-item">
              <div class="item-label auto">${item.marker} ${item.seriesName}: </div>
              <div class="item-value">${val}</div>
            </div>
          `;
        });
        return `
          <div class="tooltip-container">
            <div class="tooltip-data-date">${params[0].name}</div>
            <div>${html}</div>
          </div>
        `;
      },
    },
    legend: {
      top: 10,
      right: 10,
      data: [seriesName, seriesName1],
      textStyle: {
        color: currentTheme?.color,
      },
      show: showLegend,
    },
    color: newColor,
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: 'category',
      data: dataX,
      axisLabel: {
        formatter(value: string, index: number) {
          let isShowMinutesFor24h = false;
          if (
            selectedPeriodButton === '24h' &&
            dataX &&
            (index === 0 || dataX.length - 1 === index)
          ) {
            isShowMinutesFor24h = true;
          }
          const date = new Date(value);
          return generateXAxisLabel(date, selectedPeriodButton, isShowMinutesFor24h);
        },
        showMaxLabel: true,
        interval: generateXAxisInterval('1d', selectedPeriodButton, dataX, width),
      },
    },
    yAxis: [
      {
        type: 'value',
        name: yaxisName,
        position: 'left',
        min: minY1,
        max: maxY1,
        interval: (maxY1 - minY1) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            const val = Number.parseFloat(value);
            return !fixedNum
              ? getYAxisLabel(Number(value), minY1, maxY1)
              : `$${val.toFixed(fixedNum)}`;
          },
        },
      },
      {
        type: 'value',
        name: yaxisName1,
        position: 'right',
        min: minY2,
        max: maxY2,
        interval: (maxY2 - minY2) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY2, maxY2);
          },
        },
      },
    ],
    series: [
      {
        name: seriesName,
        type: 'line',
        showSymbol: false,
        data: dataY1,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      {
        name: seriesName1,
        type: seriesName1Type,
        yAxisIndex: 1,
        showSymbol: false,
        data: dataY2,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
    ],
    animation: false,
  };
  const downloadPNG = () => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef.ele)
        .then(function getBlob(blob: Blob | null) {
          if (blob) {
            saveAs(blob, `${makeDownloadFileName(info.currencyName, chartName)}.png`);
          }
        })
        .catch(function getError(error) {
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
    const option = {
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.color,
      },
      color: ['#cd6661', '#5470C6'],
      yAxis: [
        {
          type: 'value',
          position: 'left',
          name: 'USD:',
          splitLine: {
            lineStyle: {
              color: theme.splitLineColor,
            },
          },
          axisLine: {
            show: true,
          },
        },
        {
          type: 'value',
          name: 'BTC price:',
          position: 'right',
          splitLine: {
            lineStyle: {
              color: theme.splitLineColor,
            },
          },
          axisLine: {
            show: true,
          },
        },
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY1,
        },
        {
          type: seriesName1Type,
          yAxisIndex: 1,
          showSymbol: false,
          data: dataY2,
        },
      ],
    };
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
  const onClickPeriod = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { value } = (event.currentTarget as unknown) as { value: PeriodTypes };
      if (handlePeriodFilterChange) {
        handlePeriodFilterChange(value);
      }
    },
    [handlePeriodFilterChange],
  );

  const getCsvHeaders = () => {
    return pricesCSVHeaders.map(header => ({
      ...header,
      label: translateDropdown(header.label),
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
          {periods.length &&
            periods.map(period => (
              <Styles.PeriodButton
                className={getActivePriodButtonStyle(period)}
                value={period}
                onClick={onClickPeriod}
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
            <Skeleton animation="wave" variant="rect" height={386} />
            <Styles.LoadingText>{parse(translate('common.loadingData'))}</Styles.LoadingText>
          </Styles.LoadingWrapper>
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
      <Styles.LineChartFooter>
        <div className={styles.lineChartThemeSelect}>
          {themes.map((theme, index) => (
            <Styles.ThemeButton
              className={`${styles.themeSelectButton} ${getActiveThemeButtonStyle(index)}`}
              onClick={() => handleThemeButtonClick(theme, index)}
              style={{ backgroundColor: `${theme.backgroundColor}` }}
              type="button"
              key={`button-filter-${theme.name}`}
            >
              {` `}
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
            headers={getCsvHeaders()}
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
