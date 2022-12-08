import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { sense_chart_colors } from '@utils/constants/statistics';
import { TAlternativeNsfwScores } from '@utils/types/ITransactions';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';

import * as Styles from './SenseDetails.styles';

interface ICategoryProbabilities {
  data: TAlternativeNsfwScores[];
}

const CategoryProbabilities: React.FC<ICategoryProbabilities> = ({ data }) => {
  const { darkMode } = useSelector(getThemeState);

  const xAxisData = [];
  const seriesData = [];
  for (let i = 0; i < data.length; i += 1) {
    xAxisData.push(data[i].labels);
    seriesData.push({
      value: data[i].value,
      itemStyle: {
        color: sense_chart_colors[i] || sense_chart_colors[0],
      },
    });
  }

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
      max: 1,
      axisLine: {
        show: true,
      },
      axisLabel: {
        color: darkMode ? '#fff' : '#2D3748',
      },
    },
    series: {
      type: 'bar',
      data: seriesData,
    },
  };

  return (
    <Styles.ContentItem>
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
    </Styles.ContentItem>
  );
};

export default CategoryProbabilities;
