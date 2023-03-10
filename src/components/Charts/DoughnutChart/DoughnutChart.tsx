import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Typography, Grid } from '@material-ui/core';

import { translate } from '@utils/helpers/i18n';
import { TChartParams } from '@utils/types/IStatistics';
import themeVariant from '@theme/variants';

import { chartColors } from './DoughnutChart.options';
import * as Styles from './DoughnutChart.styles';

type TDatasetsProps = {
  data: Array<number>;
  backgroundColor: string[];
  borderWidth: number;
  borderColor: string;
  barThickness: number;
};

type TChartDataProps = {
  labels: Array<string>;
  datasets: TDatasetsProps[];
};

interface DoughnutChartProps {
  data: TChartDataProps | null;
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
  const transferChartData = () => {
    if (!data) {
      return [];
    }

    return data?.labels?.map((label, index) => ({
      value: data.datasets[0].data[index],
      name: label,
    }));
  };
  const options = {
    color: chartColors,
    tooltip: {
      trigger: 'item',
      formatter(params: TChartParams) {
        return `${params.marker} ${params.name}: ${params.value}(${params.percent}%)`;
      },
      backgroundColor: themeVariant.palette.text.primary,
      textStyle: {
        color: themeVariant.custom.white,
        fontSize: 12,
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center',
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          scaleSize: 0,
          label: {
            show: false,
          },
        },
        labelLine: {
          show: true,
        },
        data: transferChartData(),
      },
    ],
  };

  const renderChart = () => {
    return (
      <Grid container justify="center" alignItems="flex-start">
        <Styles.ChartWrapper item xs={12} sm={6} md={5}>
          <Styles.DoughnutInner>
            {innerTitle && <Typography variant="h4">{innerTitle}</Typography>}
            {innerSubtitle && <Typography variant="caption">{innerSubtitle}</Typography>}
          </Styles.DoughnutInner>
          {data && <ReactECharts notMerge={false} lazyUpdate option={options} />}
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
