import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';

import { rarenessScoreColors, rarenessScoreData } from './mockup';
import EmptyOverlay from './EmptyOverlay';
import * as Styles from './SenseDetails.styles';

interface IRarenessScore {
  rarenessScore: number;
}

const RarenessScore: React.FC<IRarenessScore> = ({ rarenessScore }) => {
  const { darkMode } = useSelector(getThemeState);

  const options = {
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 1,
        radius: '100%',
        center: ['50%', '53%'],
        axisLine: {
          lineStyle: {
            width: 30,
            color: !rarenessScore
              ? rarenessScoreColors
              : [
                  [0.34, '#F4664A'],
                  [0.66, '#FAAD14'],
                  [1, '#30BF78'],
                ],
          },
        },
        anchor: {
          show: true,
          size: 20,
          itemStyle: {
            borderColor: '#D0D0D0',
            borderWidth: 4,
            color: darkMode ? '#2D3748' : '#fff',
          },
        },
        pointer: {
          offsetCenter: [0, '-9%'],
          length: '30%',
          width: 4,
          icon: 'rect',
          itemStyle: {
            color: '#D0D0D0',
          },
        },
        axisTick: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: darkMode ? '#2D3748' : '#fff',
            width: 6,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: darkMode ? '#2D3748' : '#fff',
            width: 6,
          },
        },
        axisLabel: {
          color: darkMode ? '#ccc' : '#8F8E8E',
          distance: 35,
          fontSize: 10,
          formatter(value: number) {
            return (value * 10) % 2 === 0 ? value : null;
          },
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '65%'],
          color: darkMode ? '#fff' : '#696773',
          fontSize: 18,
          fontWeight: 'normal',
          formatter(value: number) {
            return `${(value * 100).toFixed(2)}%`;
          },
        },
        data: [
          {
            value: rarenessScore || rarenessScoreData,
          },
        ],
      },
    ],
  };

  return (
    <Styles.ContentItem className="chart-section">
      <Styles.RarenessScoreContent className={!rarenessScore ? 'empty' : ''}>
        <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '190px' }} />
      </Styles.RarenessScoreContent>
      <EmptyOverlay isShow={!rarenessScore} />
    </Styles.ContentItem>
  );
};

export default RarenessScore;
