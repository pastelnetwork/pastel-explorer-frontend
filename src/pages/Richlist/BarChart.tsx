import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import themeVariant from '@theme/variants';
import { translate } from '@utils/helpers/i18n';

import { WealthDistributionProps } from './Richlist';

type BarChartProps = {
  data: WealthDistributionProps[] | null;
};

type TTooltipParams = {
  name: string;
  value: number | string;
};

const colors = [
  ['#D437FF', '#6398FF'],
  ['#16B4EB', '#23E73C'],
  ['#FD49EB', '#FF6030'],
  ['#3F9AF7', '#6C5DD3'],
];

export const BarChart = ({ data }: BarChartProps): JSX.Element => {
  const isDarkMode = useSelector(getThemeState).darkMode;

  const yAxisData = [];
  const seriesData = [];
  if (data?.length) {
    for (let i = 0; i < data.sort((a, b) => b.amount - a.amount).length; i += 1) {
      yAxisData.push(data[i].title);
      seriesData.push({
        value: data[i].amount,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colors[i][0],
            },
            {
              offset: 1,
              color: colors[i][1],
            },
          ]),
        },
      });
    }
  }

  const options = {
    tooltip: {
      trigger: 'item',
      formatter: (params: TTooltipParams) => {
        return `<div>
          <div class="tooltip-title">${params.name}</div>
          <div class="tooltip-amount">${translate('pages.richlist.accounts', {
            currency: getCurrencyName(),
          })}: ${formatNumber(params.value, {
          decimalsLength: 2,
        })}</div>
        </div>`;
      },
    },
    grid: {
      containLabel: true,
      top: '7%',
      bottom: '0%',
      left: '5%',
      right: '5%',
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      axisLine: {
        lineStyle: {
          color: isDarkMode
            ? themeVariant.sidebar.chart.label.dark
            : themeVariant.sidebar.chart.label.light,
        },
      },
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'insideLeft',
          color: isDarkMode
            ? themeVariant.sidebar.chart.label.dark
            : themeVariant.sidebar.chart.label.light,
          formatter: (params: TTooltipParams) => {
            return `${formatNumber(params.value, {
              decimalsLength: 2,
            })} (${getCurrencyName()})`;
          },
        },
        encode: {
          x: 'amount',
          y: 'product',
        },
        data: seriesData,
      },
    ],
  };

  return <ReactECharts notMerge={false} lazyUpdate option={options} />;
};
