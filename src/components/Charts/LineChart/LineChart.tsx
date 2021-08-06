import * as React from 'react';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as Styles from './LineChart.styles';
import { options } from './LineChart.options';

interface LineChartProps {
  data: ChartData;
  title?: React.ReactNode;
  isLoading?: boolean;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, isLoading, height }) => {
  const chartHeight = height || Styles.CHART_HEIGHT;
  return (
    <Styles.Card mb={1}>
      <CardContent>
        {title}

        <Styles.Spacer mb={6} />

        {isLoading ? (
          <Skeleton animation="wave" variant="rect" height={chartHeight} />
        ) : (
          <Styles.ChartWrapper height={chartHeight}>
            <Line type="line" data={data} options={options} />
          </Styles.ChartWrapper>
        )}
      </CardContent>
    </Styles.Card>
  );
};

export default LineChart;
