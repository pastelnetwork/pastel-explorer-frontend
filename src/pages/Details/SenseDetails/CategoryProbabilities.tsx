import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { sense_chart_colors } from '@utils/constants/statistics';
import { getMinMax } from '@utils/helpers/statisticsLib';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';

import * as Styles from './SenseDetails.styles';

interface ICategoryProbabilities {
  data: string;
}

const CategoryProbabilities: React.FC<ICategoryProbabilities> = ({ data }) => {
  const { darkMode } = useSelector(getThemeState);
  if (!data) {
    return <Styles.ContentItem className="min-height-315" />;
  }
  const newData = JSON.parse(data);
  const values: number[] = Object.values(newData);
  const keys = Object.keys(newData);
  const xAxisData = [];
  const seriesData = [];
  for (let i = 0; i < keys.length; i += 1) {
    xAxisData.push(keys[i]);
    seriesData.push({
      value: values[i],
      itemStyle: {
        color: sense_chart_colors[i] || sense_chart_colors[0],
      },
    });
  }

  const min = 0;
  const max = getMinMax(values)[1] * 1.5;
  const options = {
    grid: {
      top: 30,
      left: 35,
      right: 5,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      formatter(params: TChartParams[]) {
        return `
          <div class="tooltip-wrapper">
            <div class="tooltip-label">${params[0].axisValue}</div>
            <div class="tooltip-value">
              ${params[0].marker} NSFW Scores: ${params[0].value}
            </div>
          </div>
        `;
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        color: darkMode ? '#fff' : '#2D3748',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      min,
      max,
      interval: (max - min) / 5,
      axisLine: {
        show: true,
      },
      axisLabel: {
        color: darkMode ? '#fff' : '#2D3748',
        formatter: (value: number) => {
          return value.toFixed(2);
        },
      },
    },
    series: {
      type: 'bar',
      data: seriesData,
    },
  };

  return (
    <Styles.ContentItem>
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '315px' }} />
    </Styles.ContentItem>
  );
};

export default CategoryProbabilities;
