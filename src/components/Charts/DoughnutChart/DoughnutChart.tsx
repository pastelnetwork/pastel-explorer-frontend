import React from 'react';
import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Typography, Grid } from '@material-ui/core';

import { translate } from '@utils/helpers/i18n';

import { defaultChartOptions } from './DoughnutChart.options';
import * as Styles from './DoughnutChart.styles';

interface DoughnutChartProps {
  data: ChartData | null;
  title?: string;
  innerTitle?: string;
  innerSubtitle?: string | number;
  totalSuperNodes?: number;
  link?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  title,
  innerTitle,
  innerSubtitle,
  totalSuperNodes,
  link = '',
}) => {
  const renderChart = () => {
    return (
      <Grid container justify="center" alignItems="flex-start">
        <Styles.ChartWrapper item xs={12} sm={6} md={5}>
          <Styles.DoughnutInner>
            {innerTitle && <Typography variant="h4">{innerTitle}</Typography>}
            {innerSubtitle && <Typography variant="caption">{innerSubtitle}</Typography>}
          </Styles.DoughnutInner>
          {data && <Doughnut data={data} options={defaultChartOptions} type="doughnut" />}
        </Styles.ChartWrapper>
        <Styles.ChartWrapper item xs={12} sm={6} md={7}>
          <Styles.StakingWrapper>
            {totalSuperNodes ? `${((51.84 / totalSuperNodes) * 100).toFixed(2)}%` : '--'}
            <Styles.StakingTitle>
              {translate('components.charts.doughnutChart.stakingAPR')}
            </Styles.StakingTitle>
          </Styles.StakingWrapper>
        </Styles.ChartWrapper>
      </Grid>
    );
  };
  return (
    <Styles.Card>
      {title && <h4>{title}</h4>}
      <Styles.CardContent>
        {link ? <Styles.Link to={link}>{renderChart()}</Styles.Link> : renderChart()}
      </Styles.CardContent>
    </Styles.Card>
  );
};

export default DoughnutChart;
