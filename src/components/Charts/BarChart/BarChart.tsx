import * as React from 'react';
import { ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { Skeleton } from '@material-ui/lab';

import * as Styles from './BarChart.styles';
import { options } from './BarChart.options';

interface BarChartProps {
  data: ChartData;
  title?: React.ReactNode;
  isLoading?: boolean;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, isLoading, height }) => {
  const chartHeight = height || Styles.CHART_HEIGHT;

  return (
    <Styles.CardContent>
      {title}

      {isLoading ? (
        <Skeleton animation="wave" variant="rect" height={chartHeight} />
      ) : (
        <Styles.ChartWrapper height={chartHeight}>
          <Bar type="bar" data={data} options={options} />
        </Styles.ChartWrapper>
      )}
    </Styles.CardContent>
  );
};

export default BarChart;
