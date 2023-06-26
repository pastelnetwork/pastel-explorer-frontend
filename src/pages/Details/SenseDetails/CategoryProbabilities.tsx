import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { sense_chart_colors } from '@utils/constants/statistics';
import { getMinMax } from '@utils/helpers/statisticsLib';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { TChartParams } from '@utils/types/IStatistics';
import { translate } from '@utils/helpers/i18n';

import { categoryProbabilitiesData } from './mockup';
import EmptyOverlay from './EmptyOverlay';
import * as Styles from './SenseDetails.styles';

interface ICategoryProbabilities {
  data: string;
}

const CategoryProbabilities: React.FC<ICategoryProbabilities> = ({ data }) => {
  const { darkMode } = useSelector(getThemeState);
  if (!data) {
    const xAxisData = ['drawings', 'hentai', 'sexy', 'porn', 'neutral'];
    const seriesData = [];
    for (let i = 0; i < categoryProbabilitiesData.length; i += 1) {
      seriesData.push({
        value: categoryProbabilitiesData[i],
        itemStyle: {
          color: '#ddd',
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
      <Styles.ContentItem className="chart-section">
        <div className="empty">
          <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '240px' }} />
        </div>
        <EmptyOverlay isShow />
      </Styles.ContentItem>
    );
  }
  const newData = JSON.parse(data);
  const values: number[] = Object.values(newData);
  const keys = Object.keys(newData);
  const xAxisData = [];
  const seriesData = [];
  const hasValue = !!values.reduce((total, currentItem) => total + currentItem, 0);
  for (let i = 0; i < keys.length; i += 1) {
    xAxisData.push(keys[i]);
    seriesData.push({
      value: hasValue ? values[i] : categoryProbabilitiesData[i],
      itemStyle: {
        color: !hasValue ? '#ddd' : sense_chart_colors[i] || sense_chart_colors[0],
      },
    });
  }

  const min = 0;
  const max = getMinMax(hasValue ? values : categoryProbabilitiesData)[1] * 1.5;
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
              ${params[0].marker} ${translate('pages.senseDetails.nsfwScores')}: ${params[0].value}
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
    <Styles.ContentItem className="chart-section">
      <div className={!hasValue ? 'empty' : ''}>
        <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '240px' }} />
      </div>
      <EmptyOverlay isShow={!hasValue} />
    </Styles.ContentItem>
  );
};

export default CategoryProbabilities;
