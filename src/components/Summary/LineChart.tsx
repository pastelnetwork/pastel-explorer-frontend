import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TThemeInitOption, TThemeColor } from '@utils/constants/types';
import { getSummaryThemeUpdateOption } from '@utils/helpers/chartOptions';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { themes } from '@utils/constants/statistics';
import { generateMinMaxChartData } from '@utils/helpers/statisticsLib';

import { getRouteForChart } from './Summary.helpers';
import * as Styles from './Summary.styles';

type TLineChartProps = {
  chartName: string;
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  offset: number;
  disableClick?: boolean;
};

export const LineChart = (props: TLineChartProps): JSX.Element | null => {
  const { chartName, dataX, dataY, offset, dataY1, dataY2 } = props;
  const { darkMode } = useSelector(getThemeState);
  const history = useHistory();
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
      } else if (['networkStatistics', 'blockSizesStatistics'].includes(chartName)) {
        const result = generateMinMaxChartData(min, max, offset, 5, '1h', 4);
        setMinY(result.min);
        setMaxY(result.max);
      } else {
        setMinY(Math.round(min) - offset);
        setMaxY(Math.floor(max) + offset);
      }
    }
  }, [dataY]);

  const params: TThemeInitOption = {
    theme: currentTheme,
    dataX,
    dataY,
    dataY1,
    dataY2,
    chartName,
    minY,
    maxY,
    darkMode,
  };
  const options = getSummaryThemeUpdateOption(params);

  const onChartClick = () => {
    if (!props.disableClick) {
      history.push(getRouteForChart(chartName));
    }
  };

  return (
    <Styles.LineChartWrap onClick={onChartClick}>
      <ReactECharts notMerge={false} lazyUpdate option={options} />
    </Styles.LineChartWrap>
  );
};

LineChart.defaultProps = {
  dataX: undefined,
  dataY: undefined,
  dataY1: undefined,
  dataY2: undefined,
  disableClick: false,
};
