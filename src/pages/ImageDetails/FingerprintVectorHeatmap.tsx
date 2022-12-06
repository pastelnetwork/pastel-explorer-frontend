import ReactECharts from 'echarts-for-react';
// import { useSelector } from 'react-redux';

// import { getThemeState } from '@redux/reducers/appThemeReducer';
// import { TChartParams } from '@utils/types/IStatistics';

import * as Styles from './ImageDetails.styles';
import { xData, yData, data } from './mockup';

const FingerprintVectorHeatmap: React.FC = () => {
  // const { darkMode } = useSelector(getThemeState);

  const options = {
    tooltip: {},
    grid: {
      right: 140,
      left: 40,
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'category',
      data: yData,
    },
    visualMap: {
      type: 'piecewise',
      min: 0,
      max: 1,
      left: 'right',
      top: 'center',
      calculable: true,
      realtime: false,
      splitNumber: 8,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
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
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '500px' }} />
    </Styles.ContentItem>
  );
};

export default FingerprintVectorHeatmap;
