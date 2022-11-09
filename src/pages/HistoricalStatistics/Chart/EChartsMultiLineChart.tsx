import { useState, useEffect, useRef, MouseEvent, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import * as htmlToImage from 'html-to-image';
import * as echarts from 'echarts';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

import { Data } from 'react-csv/components/CommonPropTypes';
import { makeDownloadFileName, PeriodTypes } from '@utils/helpers/statisticsLib';
import { pricesCSVHeaders, themes } from '@utils/constants/statistics';
import { TLineChartProps, TThemeColor } from '@utils/constants/types';
import { generateXAxisLabel } from '@utils/helpers/chartOptions';
import { getThemeState } from '@redux/reducers/appThemeReducer';

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
    offset,
    period: selectedPeriodButton,
    periods = [],
    title,
    seriesName = 'USD Price: ',
    seriesName1 = 'BTC Price: ',
    yaxisName = 'USD Price',
    yaxisName1 = 'BTC Price',
    handlePeriodFilterChange,
    handleBgColorChange,
    setHeaderBackground,
    isDynamicTitleColor,
  } = props;
  const downloadRef = useRef(null);
  const { darkMode } = useSelector(getThemeState);
  const [csvData, setCsvData] = useState<string | Data>('');
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(null);
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>();
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>();
  const [selectedThemeButton, setSelectedThemeButton] = useState(0);
  const [isSelectedTheme, setSelectedTheme] = useState(false);
  const [minY1, setMinY1] = useState(0);
  const [minY2, setMinY2] = useState(0);

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
      const min = Math.min(...dataY1);
      const min1 = Math.min(...dataY2);
      if (chartName === 'prices') {
        setMinY1(min - offset);
        setMinY2(min1);
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
    }
  }, [dataY1, dataY2]);

  const options = {
    grid: {
      top: 50,
      right: 100,
      bottom: 40,
      left: 60,
      show: false,
    },
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: minY1,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      data: dataX,
      axisLabel: {
        formatter(value: string) {
          const date = new Date(value);
          return generateXAxisLabel(date, selectedPeriodButton);
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: yaxisName,
        position: 'left',
        min: minY1,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            const val = Number.parseFloat(value);
            return !fixedNum ? Math.round(val) : `$${val.toFixed(fixedNum)}`;
          },
        },
      },
      {
        type: 'value',
        name: yaxisName1,
        position: 'right',
        min: minY2,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            const val = Number.parseFloat(value);
            return !fixedNum1 ? Math.round(val) : `$${val.toFixed(fixedNum1)}`;
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
      },
      {
        name: seriesName1,
        type: 'bar',
        yAxisIndex: 1,
        showSymbol: false,
        color: '#5470C6',
        barWidth: 5,
        data: dataY2,
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
          throw new Error(`PNG download error: ${error}`);
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
          lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowBlur: 10,
            shadowOffsetY: 8,
          },
        },
        {
          type: 'bar',
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
  return (
    <Styles.ChartContainer>
      <Styles.LineChartHeader className={setHeaderBackground ? 'has-bg' : ''}>
        {isDynamicTitleColor ? (
          <Styles.ChartTitle style={{ color: currentTheme?.color }}>{title}</Styles.ChartTitle>
        ) : (
          <Styles.ChartTitle>{title}</Styles.ChartTitle>
        )}
        <Styles.PeriodSelect>
          <span>Period: </span>
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
      <Styles.LineChartWrap>
        <ReactECharts
          notMerge={false}
          lazyUpdate
          option={options}
          className={styles.reactECharts}
          ref={e => {
            setEChartRef(e);
          }}
        />
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
            Download PNG
          </Styles.DonwloadButton>
          <Styles.CSVLinkButton
            data={csvData}
            filename={`${makeDownloadFileName(info.currencyName, chartName)}.csv`}
            headers={pricesCSVHeaders}
            separator=","
            ref={downloadRef}
            className={styles.uploadButton}
          >
            Download CSV
          </Styles.CSVLinkButton>
        </div>
      </Styles.LineChartFooter>
    </Styles.ChartContainer>
  );
};
