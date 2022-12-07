import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';

import * as Styles from './SenseDetails.styles';

const colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const mockup = [0.114422835, 0.060403667, 0.78351456, 0.0119043095, 0.029754573];

const CategoryProbabilities: React.FC = () => {
  const { darkMode } = useSelector(getThemeState);

  const seriesData = mockup.map((item, index) => ({
    value: item,
    itemStyle: {
      color: colors[index],
    },
  }));

  const options = {
    grid: {
      top: 10,
      left: 45,
      right: 10,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      formatter(params: TChartParams[]) {
        return `
          <div class="tooltip-wrapper">
            <div class="tooltip-label">${params[0].axisValue}</div>
            <div class="tooltip-value">
              ${params[0].marker}NSFW Scores: ${params[0].value}
            </div>
          </div>
        `;
      },
    },
    xAxis: {
      type: 'category',
      data: ['drawings', 'hentai', 'neutral', 'porn', 'sexy'],
      splitLine: {
        show: true,
      },
      axisLabel: {
        color: darkMode ? '#fff' : '#2D3748',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
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
    <Styles.ContentItem className="py-10">
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '300px' }} />
    </Styles.ContentItem>
  );
};

export default CategoryProbabilities;
