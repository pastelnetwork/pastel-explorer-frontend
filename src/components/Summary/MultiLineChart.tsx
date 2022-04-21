import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

import * as Styles from './Summary.styles';

type TMultiLineChartProps = {
  chartName: string;
  dataX?: string[];
  dataY1?: number[];
  dataY2?: number[];
  offset: number;
};

export const MultiLineChart = (props: TMultiLineChartProps): JSX.Element | null => {
  const { chartName, dataX, dataY1, dataY2, offset } = props;
  const [minY1, setMinY1] = useState(0);
  const [minY2, setMinY2] = useState(0);
  const [maxY1, setMaxY1] = useState(0);
  const [maxY2, setMaxY2] = useState(0);

  useEffect(() => {
    if (dataY1?.length && dataY2?.length) {
      const min = Math.min(...dataY1);
      const max = Math.max(...dataY1);
      const min1 = Math.min(...dataY2);
      const max1 = Math.max(...dataY2);
      if (chartName === 'usdPrice') {
        setMinY1(min - offset);
        setMaxY1(max + offset);
        setMinY2(min1);
        setMaxY2(max1);
      }
    }
  }, [dataY1, dataY2]);

  const options = {
    grid: {
      top: 8,
      right: 0,
      bottom: 8,
      left: 0,
      show: false,
    },
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: minY1,
      max: maxY1,
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
        show: false,
      },
      splitLine: {
        show: false,
      },
      show: false,
    },
    yAxis: [
      {
        type: 'value',
        min: minY1,
        max: maxY1,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      {
        type: 'value',
        min: minY2,
        max: maxY2,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: dataY1,
      },
      {
        type: 'bar',
        yAxisIndex: 1,
        showSymbol: false,
        color: '#5470C6',
        barWidth: 5,
        data: dataY2,
      },
    ],
    stateAnimation: {
      duration: 300,
      easing: 'cubicOut',
    },
  };

  return (
    <Styles.LineChartWrap>
      <ReactECharts notMerge={false} lazyUpdate option={options} />
      <Styles.LineChartTitle>Last 7 Days</Styles.LineChartTitle>
    </Styles.LineChartWrap>
  );
};

MultiLineChart.defaultProps = {
  dataX: undefined,
  dataY1: undefined,
  dataY2: undefined,
};
