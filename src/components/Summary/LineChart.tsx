import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { TThemeInitOption, TThemeColor } from '@utils/constants/types';
import { getSummaryThemeUpdateOption } from '@utils/helpers/chartOptions';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { themes } from '@utils/constants/statistics';

import * as Styles from './Summary.styles';

type TLineChartProps = {
  chartName: string;
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  offset: number;
};

export const LineChart = (props: TLineChartProps): JSX.Element | null => {
  const { chartName, dataX, dataY, offset, dataY1, dataY2 } = props;
  const { darkMode } = useSelector(getThemeState);
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
        chartName === 'avgTransactionsPerSecond' ||
        chartName === 'avgTransactionPerBlockLast24Hour' ||
        chartName === 'avgTransactionFeeLast24Hour'
      ) {
        setMinY(min);
        setMaxY(max);
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

  return (
    <Styles.LineChartWrap>
      <ReactECharts notMerge={false} lazyUpdate option={options} />
    </Styles.LineChartWrap>
  );
};

LineChart.defaultProps = {
  dataX: undefined,
  dataY: undefined,
  dataY1: undefined,
  dataY2: undefined,
};
