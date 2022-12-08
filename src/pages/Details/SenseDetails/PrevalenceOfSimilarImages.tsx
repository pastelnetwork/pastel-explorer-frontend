import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { sense_chart_colors } from '@utils/constants/statistics';
import { TPrevalenceOfSimilarImages } from '@utils/types/ITransactions';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';

import * as Styles from './SenseDetails.styles';

interface IPrevalenceOfSimilarImages {
  data: TPrevalenceOfSimilarImages;
}

const PrevalenceOfSimilarImages: React.FC<IPrevalenceOfSimilarImages> = ({ data }) => {
  const { darkMode } = useSelector(getThemeState);

  const seriesData = [
    data.dupeProbAbove25pct,
    data.dupeProbAbove33pct,
    data.dupeProbAbove50pct,
  ].map((item, index) => ({
    value: item,
    itemStyle: {
      color: sense_chart_colors[index] || sense_chart_colors[0],
    },
  }));
  const min = 0;
  const max = 0.5;
  const options = {
    grid: {
      top: 30,
      left: 35,
      right: 10,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      formatter(params: TChartParams[]) {
        return `
          <div class="tooltip-wrapper max-w-280">
            <div class="tooltip-label">${params[0].axisValue}</div>
            <div class="tooltip-value">
              ${params[0].marker} % of Top-10 Most<br>SimilarImages with Dupe<br>Probability Above: ${params[0].value}
            </div>
          </div>
        `;
      },
    },
    xAxis: {
      type: 'category',
      data: ['25%', '33%', '50%'],
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

export default PrevalenceOfSimilarImages;
