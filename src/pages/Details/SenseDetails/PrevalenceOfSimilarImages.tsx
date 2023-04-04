import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { sense_chart_colors } from '@utils/constants/statistics';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './SenseDetails.styles';

interface IPrevalenceOfSimilarImages {
  data: {
    [key: string]: number;
  };
}

const PrevalenceOfSimilarImages: React.FC<IPrevalenceOfSimilarImages> = ({ data }) => {
  const { darkMode } = useSelector(getThemeState);
  if (!data) {
    return <Styles.ContentItem className="min-height-315" />;
  }
  const values: number[] = Object.values(data);
  const keys = Object.keys(data);
  const seriesData = [];
  const xAxisData = [];
  for (let i = 0; i < values.length; i += 1) {
    seriesData.push({
      value: values[i],
      itemStyle: {
        color: sense_chart_colors[i] || sense_chart_colors[0],
      },
    });
    xAxisData.push(keys[i]);
  }
  const max = Math.max(...seriesData.map(item => item.value)) * 1.5 || 0.1;
  const min = 0;
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
              ${params[0].marker} ${translate('pages.senseDetails.top10SimilarImages')}: ${
          params[0].value
        }
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
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '240px' }} />
    </Styles.ContentItem>
  );
};

export default PrevalenceOfSimilarImages;
