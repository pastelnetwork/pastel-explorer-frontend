import * as React from 'react';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CardContent } from '@material-ui/core';

import * as Styles from './LineChart.styles';
import { options } from './LineChart.options';

interface LineChartProps {
  data: ChartData;
  title?: React.ReactNode;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <Styles.Card mb={1}>
      <CardContent>
        {title}

        <Styles.Spacer mb={6} />

        <Styles.ChartWrapper>
          <Line type="line" data={data} options={options} />
        </Styles.ChartWrapper>
      </CardContent>
    </Styles.Card>
  );
};

export default LineChart;
