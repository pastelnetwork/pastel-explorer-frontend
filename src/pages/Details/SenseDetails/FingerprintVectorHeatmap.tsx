import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';
import { THeatmapChartParams } from '@utils/types/IStatistics';
import {
  getMinMax,
  getFractionDigits,
  transformFingerprintsData,
} from '@utils/helpers/statisticsLib';

import EmptyOverlay from './EmptyOverlay';
import { fingerprintVectorHeatmapData } from './mockup';
import * as Styles from './SenseDetails.styles';

interface IFingerprintVectorHeatmap {
  data: number[];
}

const FingerprintVectorHeatmap: React.FC<IFingerprintVectorHeatmap> = ({ data }) => {
  const { darkMode } = useSelector(getThemeState);
  const newData = !data.length ? fingerprintVectorHeatmapData : data;
  const { xData, yData, seriesData } = transformFingerprintsData(newData);
  const arr = getMinMax(newData);
  const min = arr[0];
  const max = arr[1];

  const options = {
    tooltip: {
      formatter(params: THeatmapChartParams) {
        return `
          <div class="tooltip-wrapper">
            <div class="flex">
              <div class="tooltip-label">x:</div>
              <div class="tooltip-value ml-5">${params.data[0]}</div>
            </div>
            <div class="flex">
              <div class="tooltip-label">y:</div>
              <div class="tooltip-value ml-5">${params.data[1]}</div>
            </div>
            <div class="flex">
              <div class="tooltip-label">z:</div>
              <div class="tooltip-value ml-5">${params.data[2]}</div>
            </div>
          </div>
        `;
      },
    },
    grid: {
      right: 80,
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
      min,
      max,
      left: 'right',
      top: 'center',
      calculable: true,
      realtime: false,
      splitNumber: 12,
      precision: getFractionDigits(min, max),
      inRange: {
        color: !data.length
          ? ['#eff', '#aaa']
          : [
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
        name: 'fingerprintVectorHeatmap',
        type: 'heatmap',
        data: seriesData,
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
    <Styles.ContentItem className="chart-section">
      <div className={!data.length ? 'empty' : ''}>
        <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
      </div>
      <EmptyOverlay isShow={!data.length} />
    </Styles.ContentItem>
  );
};

export default FingerprintVectorHeatmap;
