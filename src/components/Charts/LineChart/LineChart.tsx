import * as React from 'react';
import { Line, ChartComponentProps } from 'react-chartjs-2';
import { CardContent, Typography } from '@material-ui/core';

import * as Styles from './LineChart.styles';
import { options } from './LineChart.options';

interface LineChartProps {
  data: ChartComponentProps['data'];
  title?: string;
  subtitle?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, subtitle }) => {
  return (
    <Styles.Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {subtitle}
        </Typography>

        <Styles.Spacer mb={6} />

        <Styles.ChartWrapper>
          <Line data={data} options={options} />
        </Styles.ChartWrapper>
      </CardContent>
    </Styles.Card>
  );
};

export default LineChart;
