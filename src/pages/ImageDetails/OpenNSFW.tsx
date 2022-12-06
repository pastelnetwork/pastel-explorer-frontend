import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';

import * as Styles from './ImageDetails.styles';

const OpenNSFW: React.FC = () => {
  const { darkMode } = useSelector(getThemeState);

  const options = {
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 1,
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.65, darkMode ? '#2D3748' : '#fff'],
              [0.8, '#FAAD14'],
              [1, '#DC3912'],
            ],
          },
        },
        anchor: {
          show: true,
          size: 20,
          itemStyle: {
            borderColor: '#666666',
            borderWidth: 1,
            color: '#4684EE',
          },
        },
        pointer: {
          offsetCenter: [0, '15%'],
          length: '100%',
          width: 7,
          itemStyle: {
            color: '#E47257',
          },
        },
        axisTick: {
          distance: -20,
          length: 6,
          lineStyle: {
            color: darkMode ? '#5B5A5E' : '#666666',
            width: 2,
          },
        },
        splitLine: {
          distance: -20,
          length: 15,
          lineStyle: {
            color: darkMode ? '#5B5A5E' : '#333333',
            width: 3,
          },
        },
        axisLabel: {
          color: darkMode ? '#ccc' : '#000',
          distance: 30,
          fontSize: 12,
          formatter(value: number) {
            return value * 100;
          },
        },
        detail: {
          valueAnimation: true,
          color: darkMode ? '#fff' : '#424242',
          fontSize: 24,
          offsetCenter: [0, '80%'],
          fontWeight: 'normal',
        },
        title: {
          offsetCenter: [0, '-30%'],
          fontSize: 24,
          color: darkMode ? '#fff' : '#424242',
        },
        data: [
          {
            value: 0.001,
            name: 'NSFW',
          },
        ],
      },
    ],
  };

  return (
    <Styles.OpenNSFWChartWrapper>
      <ReactECharts notMerge={false} lazyUpdate option={options} />
      <Styles.OpenNSFWChartOverlay />
    </Styles.OpenNSFWChartWrapper>
  );
};

export default OpenNSFW;
