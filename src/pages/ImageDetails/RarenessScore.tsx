import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';

import * as Styles from './ImageDetails.styles';

const RarenessScore: React.FC = () => {
  const { darkMode } = useSelector(getThemeState);

  const options = {
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 1,
        radius: '100%',
        center: ['50%', '60%'],
        axisLine: {
          lineStyle: {
            width: 40,
            color: [
              [0.34, '#F4664A'],
              [0.66, '#FAAD14'],
              [1, '#30BF78'],
            ],
          },
        },
        anchor: {
          show: true,
          size: 30,
          itemStyle: {
            borderColor: '#D0D0D0',
            borderWidth: 6,
            color: darkMode ? '#2D3748' : '#fff',
          },
        },
        pointer: {
          offsetCenter: [0, '-7%'],
          length: '40%',
          width: 6,
          icon: 'rect',
          itemStyle: {
            color: '#D0D0D0',
          },
        },
        axisTick: {
          distance: -40,
          length: 40,
          lineStyle: {
            color: darkMode ? '#2D3748' : '#fff',
            width: 6,
          },
        },
        splitLine: {
          distance: -40,
          length: 40,
          lineStyle: {
            color: darkMode ? '#2D3748' : '#fff',
            width: 6,
          },
        },
        axisLabel: {
          color: darkMode ? '#ccc' : '#8F8E8E',
          distance: 50,
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '55%'],
          color: darkMode ? '#fff' : '#696773',
          fontSize: 34,
          fontWeight: 'normal',
          formatter(value: number) {
            return `${(value * 100).toFixed(2)}%`;
          },
        },
        data: [
          {
            value: 0.9908,
          },
        ],
      },
    ],
  };

  return (
    <Styles.ContentItem>
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
    </Styles.ContentItem>
  );
};

export default RarenessScore;
