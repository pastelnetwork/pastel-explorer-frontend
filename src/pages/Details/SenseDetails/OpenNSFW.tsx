import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

import { getThemeState } from '@redux/reducers/appThemeReducer';
import { translateDropdown } from '@utils/helpers/i18n';

import { openNSFWColors, openNSFWScoreData } from './mockup';
import EmptyOverlay from './EmptyOverlay';
import * as Styles from './SenseDetails.styles';

interface IOpenNSFWProps {
  openNSFWScore: number;
}

const OpenNSFW: React.FC<IOpenNSFWProps> = ({ openNSFWScore }) => {
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
            color: !openNSFWScore
              ? openNSFWColors
              : [
                  [0.66, darkMode ? '#2D3748' : '#fff'],
                  [0.8, '#FAAD14'],
                  [1, '#DC3912'],
                ],
          },
        },
        anchor: {
          show: true,
          size: 20,
          showAbove: true,
          itemStyle: {
            borderColor: !openNSFWScore ? '#ddd' : '#666666',
            borderWidth: 1,
            color: !openNSFWScore ? '#ddd' : '#4684EE',
          },
        },
        pointer: {
          offsetCenter: [0, '15%'],
          length: '100%',
          width: 7,
          itemStyle: {
            color: !openNSFWScore ? '#ddd' : '#E47257',
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
          length: 10,
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
            return value === 0 || value === 1 ? value * 100 : null;
          },
        },
        detail: {
          valueAnimation: true,
          color: darkMode ? '#fff' : '#424242',
          fontSize: 18,
          offsetCenter: [0, '80%'],
          fontWeight: 'normal',
          formatter(value: number) {
            return value.toFixed(3);
          },
        },
        title: {
          offsetCenter: [0, '-37%'],
          fontSize: 18,
          color: darkMode ? '#fff' : '#424242',
        },
        data: [
          {
            value: openNSFWScore || openNSFWScoreData,
            name: translateDropdown('pages.senseDetails.nsfw'),
          },
        ],
      },
    ],
  };

  return (
    <Styles.OpenNSFWChartWrapper>
      <Styles.OpenNSFWContent className={`${!openNSFWScore ? 'empty' : ''} OpenNSFWContent`}>
        <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '200px' }} />
        <Styles.OpenNSFWChartOverlay />
      </Styles.OpenNSFWContent>
      <EmptyOverlay isShow={!openNSFWScore} />
    </Styles.OpenNSFWChartWrapper>
  );
};

export default OpenNSFW;
