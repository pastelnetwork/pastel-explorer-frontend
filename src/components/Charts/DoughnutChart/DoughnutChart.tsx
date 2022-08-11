import React, { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { Typography, Grid } from '@material-ui/core';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { themes } from '@utils/constants/statistics';
import { TThemeColor } from '@utils/constants/types';
import { TToolTipParamsProps } from '@utils/helpers/chartOptions';

import { defaultChartOptions, chartColor } from './DoughnutChart.options';
import * as Styles from './DoughnutChart.styles';

interface DoughnutChartProps {
  data: ChartData | null;
  stakingAPRData: number[] | null;
  title?: string;
  innerTitle?: string;
  innerSubtitle?: string | number;
  stakingAPRHeader?: string[];
  totalSuperNodes: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  stakingAPRData,
  title,
  innerTitle,
  innerSubtitle,
  stakingAPRHeader,
  totalSuperNodes,
}) => {
  const { darkMode } = useSelector(getThemeState);
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(null);

  useEffect(() => {
    if (darkMode) {
      setCurrentTheme(themes[0]);
    } else {
      setCurrentTheme(themes[2]);
    }
  }, [darkMode]);

  const options = {
    backgroundColor: currentTheme?.backgroundColor,
    textStyle: {
      color: currentTheme?.color,
    },
    grid: {
      top: 8,
      right: 4,
      bottom: 10,
      left: 4,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: TToolTipParamsProps[]) => {
        const value: number = (data?.datasets?.[0]?.data[params[0].dataIndex] as number) || 1;
        return `${params[0].axisValue}<br />${params[0].marker}Staking APR:&nbsp;&nbsp;${
          params[0].data
        }<br/>Quantity:&nbsp;&nbsp;${data?.datasets?.[0]?.data[params[0].dataIndex]}(${(
          (value * 100) /
          totalSuperNodes
        ).toFixed(2)}%)`;
      },
    },
    xAxis: {
      type: 'category',
      data: stakingAPRHeader,
      show: true,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: {
      type: 'bar',
      data: stakingAPRData,
      label: {
        show: true,
        position: 'inside',
      },
      itemStyle: {
        color(param: TToolTipParamsProps) {
          return chartColor[param.dataIndex];
        },
      },
    },
    stateAnimation: {
      duration: 300,
      easing: 'cubicOut',
    },
  };
  return (
    <Styles.Card>
      {title && <h4>{title}</h4>}
      <Styles.CardContent>
        <Grid container justify="center" alignItems="flex-start">
          <Styles.ChartWrapper item xs={12} sm={5}>
            <Styles.DoughnutInner>
              {innerTitle && <Typography variant="h4">{innerTitle}</Typography>}
              {innerSubtitle && <Typography variant="caption">{innerSubtitle}</Typography>}
            </Styles.DoughnutInner>
            {data && <Doughnut data={data} options={defaultChartOptions} type="doughnut" />}
          </Styles.ChartWrapper>
          <Grid item xs={12} sm={7}>
            <Styles.StakingAPRChart>
              <ReactECharts notMerge={false} lazyUpdate option={options} />
            </Styles.StakingAPRChart>
          </Grid>
        </Grid>
      </Styles.CardContent>
    </Styles.Card>
  );
};

export default DoughnutChart;
