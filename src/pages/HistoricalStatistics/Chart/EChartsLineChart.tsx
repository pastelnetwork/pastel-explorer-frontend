import { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { CSVLink } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes';
import { makeDownloadFileName } from '@utils/helpers/statisticsLib';
import { csvHeaders, themes } from '@utils/constants/statistics';
import { TLineChartProps, TThemeColor, TThemeInitOption } from '@utils/constants/types';
import { getThemeInitOption, getThemeUpdateOption } from '@utils/helpers/chartOptions';
import { useUpdatChartTheme } from '@utils/hooks';
import { eChartLineStyles } from './styles';

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
  } = props;
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const [csvData, setCsvData] = useState<string | Data>('');
  const [selectedThemeButton, setSelectedThemeButton] = useState(0);
  // const [selectedGranularityButton, setSelectedGranularityButton] = useState(0);
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
    if (dataY?.length) {
      const min = Math.min(...dataY);
      const max = Math.max(...dataY);
      if (chartName === 'mempoolsize') {
        setMinY(Math.floor(min));
        setMaxY(Math.ceil(max));
      } else if (chartName === 'difficulty') {
        setMinY(Math.floor(min / offset) * offset);
        setMaxY(Math.ceil(max / offset) * offset);
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

  const params: TThemeInitOption = {
    theme: currentTheme,
    dataX,
    dataY,
    dataY1,
    dataY2,
    chartName,
    minY,
    maxY,
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

    const paramsOption: TThemeInitOption = {
      theme,
      dataX,
      dataY,
      chartName,
      minY,
      maxY,
    };
    const option = getThemeUpdateOption(paramsOption);
    eChartInstance?.setOption(option);
  };

  const getActivePriodButtonStyle = (index: string): string => {
    if (selectedPeriodButton === index) {
      return styles.activeButton;
    }
    return '';
  };

  const getActiveGranularityButtonStyle = useMemo(
    () => (granularity: string): string => {
      if (selectedGranularityButton === granularity) {
        return styles.activeButton;
      }
      return '';
    },
    [selectedGranularityButton],
  );

  const getActiveThemeButtonStyle = (index: number): string => {
    if (selectedThemeButton === index) {
      return styles.activeThemeButton;
    }
    return '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.lineChartHeader}>
        <div className={styles.lineChartTitle} style={{ color: currentTheme?.color }}>
          {title}
        </div>
        <div>
          {granularities && (
            <div className={styles.periodSelect}>
              <span style={{ color: currentTheme?.color }}>Granularity: </span>
              {granularities?.map(granularity => {
                return (
                  <button
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
                  </button>
                );
              })}
            </div>
          )}
          {periods && periods.length ? (
            <div className={styles.periodSelect}>
              <span style={{ color: currentTheme?.color }}>Period: </span>
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
          ) : null}
        </div>
      </div>
      <div className={styles.lineChartWrap}>
        <ReactECharts
          notMerge={false}
          lazyUpdate
          option={options}
          className={styles.reactECharts}
          ref={e => {
            setEChartRef(e);
          }}
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
              {' '}
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
