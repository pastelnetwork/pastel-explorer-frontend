import React from 'react';

import { Grid } from '@material-ui/core';

import * as Styles from './BarChartstyles';
import ChartSVG from './ChartSVG';

interface BarChartProps {
  data: {
    labels?: string[];
    data?: number[];
  };
  title?: string;
  innerTitle?: string;
  innerSubtitle?: string | number;
  table?: React.ReactNode;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const chartData = data?.data as number[];
  const chartLabel = data?.labels as string[];

  return (
    <Styles.Card>
      {title && <h4>{title}</h4>}
      <Styles.CardContent>
        <Grid container justify="center" alignItems="flex-start">
          <Styles.ChartWrapper item sm={12} md={12}>
            <ChartSVG data={chartData} labels={chartLabel} />
          </Styles.ChartWrapper>
        </Grid>
      </Styles.CardContent>
    </Styles.Card>
  );
};

export default BarChart;
