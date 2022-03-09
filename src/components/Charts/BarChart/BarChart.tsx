import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Grid } from '@material-ui/core';
import themeVariant from '@theme/variants';
import { useSelector } from 'react-redux';
import { getThemeState } from '@redux/reducers/appThemeReducer';

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
  const isDarkMode = useSelector(getThemeState).darkMode;

  const defaultChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: themeVariant.palette.text.primary,
      },
    },
    cutout: '80%',
    scales: {
      yAxes: {
        ticks: {
          color: !isDarkMode ? themeVariant.sidebar.chart.light : themeVariant.sidebar.chart.dark,
        },
      },
      xAxes: {
        ticks: {
          color: !isDarkMode ? themeVariant.sidebar.chart.light : themeVariant.sidebar.chart.dark,
        },
      },
    },
  };

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
          <Styles.ChartWrapper item sm={12} md={12}>
            {data && <Bar data={data} options={defaultChartOptions} type="bar" />}
          </Styles.ChartWrapper>
        </Grid>
      </Styles.CardContent>
    </Styles.Card>
  );
};

export default BarChart;
