import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';

import * as Styles from './SenseDetails.styles';
import { xData, yData, data } from './mockup';

const FingerprintVectorHeatmap: React.FC = () => {
  const { darkMode } = useSelector(getThemeState);

  const options = {
    tooltip: {},
    grid: {
      right: 60,
      left: 25,
      top: 10,
      bottom: 20,
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        color: darkMode ? '#fff' : '#2D3748',
        interval: 4,
      },
    },
    yAxis: {
      type: 'category',
      data: yData,
      axisLabel: {
        color: darkMode ? '#fff' : '#2D3748',
        interval: 4,
      },
    },
    visualMap: {
      min: 0,
      max: 1,
      left: 'right',
      top: 'center',
      calculable: true,
      realtime: false,
      splitNumber: 12,
      inRange: {
        color: [
          '#0309FF',
          '#3091FF',
          '#53B9FF',
          '#80CCFF',
          '#C2CCFF',
          '#FFFDFF',
          '#FFC0FF',
          '#FF84EA',
          '#FF669B',
          '#FF5757',
          '#FF0404',
        ],
      },
      textStyle: {
        color: darkMode ? '#fff' : '#2D3748',
      },
    },
    series: [
      {
        name: 'Gaussian',
        type: 'heatmap',
        data,
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 1,
          },
        },
        progressive: 1000,
        animation: false,
      },
    ],
  };

  return (
    <Styles.ContentItem>
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
    </Styles.ContentItem>
  );
};

export default FingerprintVectorHeatmap;
