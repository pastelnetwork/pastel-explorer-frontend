import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TThemeInitOption, TThemeColor } from '@utils/constants/types';
import { getSummaryThemeUpdateOption } from '@utils/helpers/chartOptions';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { themes } from '@utils/constants/statistics';
import { generateMinMaxChartData, PeriodTypes } from '@utils/helpers/statisticsLib';
import useWindowDimensions from '@hooks/useWindowDimensions';

import { getRouteForChart } from './Summary.helpers';
import * as Styles from './Summary.styles';

type TLineChartProps = {
  chartName: string;
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  dataY3?: number[][];
  offset: number;
  disableClick?: boolean;
  className?: string;
  period?: PeriodTypes;
  seriesName?: string;
  chartColor?: string;
};

export const LineChart = (props: TLineChartProps): JSX.Element | null => {
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>();
  const { width } = useWindowDimensions();
  const {
    className,
    chartName,
    dataX,
    dataY,
    offset,
    dataY1,
    dataY2,
    dataY3,
    period,
    seriesName,
    chartColor,
  } = props;
  const { darkMode } = useSelector(getThemeState);
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(null);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  useEffect(() => {
    if (darkMode) {
      setCurrentTheme(themes[0]);
    } else {
      setCurrentTheme(themes[2]);
    }
  }, [darkMode]);

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
      } else if (
        [
          'percentPSLStaked',
          'totalOfCascadeRequests',
          'totalSizeOfDataStored',
          'incomingTransactions',
          'volumeTransactions',
        ].indexOf(chartName) !== -1
      ) {
        setMinY(min - offset);
        setMaxY(max + offset);
      } else if (
        chartName === 'avgTransactionsPerSecond' ||
        chartName === 'avgTransactionPerBlockLast24Hour' ||
        chartName === 'avgTransactionFeeLast24Hour'
      ) {
        setMinY(min);
        setMaxY(max);
      } else if (
        [
          'networkStatistics',
          'blockSizesStatistics',
          'trailing50BlockAverageBlocks',
          'trailing10BlockAverageBlockTime',
        ].includes(chartName)
      ) {
        const result = generateMinMaxChartData(min, max, offset, 5, '1h', 4);
        setMinY(result.min);
        setMaxY(result.max);
      } else if (['miningChangeAnalysisTrailing50Block'].includes(chartName)) {
        if (dataY1) {
          const newMin = Math.min(...[...dataY, ...dataY1]);
          const newMax = Math.max(...[...dataY, ...dataY1]);
          const result = generateMinMaxChartData(newMin, newMax, offset, 4, '1h', 4);
          setMinY(result.min);
          setMaxY(result.max);
        }
      } else if (
        [
          'totalSizeOfDataStored',
          'totalFingerprintsOnSense',
          'directionIncoming',
          'directionOutgoing',
        ].includes(chartName)
      ) {
        const result = generateMinMaxChartData(min, max, offset, 5);
        setMinY(result.min);
        setMaxY(result.max);
      } else if (['balanceHistory'].includes(chartName)) {
        const result = generateMinMaxChartData(min, max, offset, 5, period, 2, 0.2);
        setMinY(result.min);
        setMaxY(result.max);
      } else {
        setMinY(Math.round(min) - offset);
        setMaxY(Math.floor(max) + offset);
      }
    }
    if (dataY3?.length) {
      if (['timeBetweenBlocksInMinutes'].includes(chartName)) {
        if (dataY3) {
          const newDataY3 = dataY3.reduce((yAxis, item) => {
            yAxis.push(item[1]);
            return yAxis;
          }, []);
          const newMin = Math.min(...newDataY3);
          const newMax = Math.max(...newDataY3);
          const result = generateMinMaxChartData(newMin, newMax, offset, 5, '1h');
          setMinY(result.min);
          setMaxY(result.max);
        }
      }
    }
  }, [dataY, dataY3]);

  useEffect(() => {
    if (eChartRef) {
      const chartInstance: echarts.ECharts = eChartRef.getEchartsInstance();
      chartInstance.resize();
    }
  }, [width]);

  const params: TThemeInitOption = {
    theme: currentTheme,
    dataX,
    dataY,
    dataY1,
    dataY2,
    dataY3,
    chartName,
    minY,
    maxY,
    darkMode,
    period,
    width,
    seriesName,
    chartColor,
  };
  const options = getSummaryThemeUpdateOption(params);

  const onChartClick = () => {
    if (!props?.disableClick) {
      navigate(getRouteForChart(chartName));
    }
  };

  return (
    <Styles.LineChartWrap className={className || ''} onClick={onChartClick}>
      <ReactECharts
        notMerge={false}
        lazyUpdate
        option={options}
        ref={e => {
          setEChartRef(e);
        }}
      />
    </Styles.LineChartWrap>
  );
};

LineChart.defaultProps = {
  dataX: undefined,
  dataY: undefined,
  dataY1: undefined,
  dataY2: undefined,
  dataY3: undefined,
  className: undefined,
  period: undefined,
  seriesName: undefined,
  chartColor: undefined,
  disableClick: false,
};
