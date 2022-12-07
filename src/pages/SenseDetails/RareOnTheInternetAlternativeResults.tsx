import ReactECharts from 'echarts-for-react';

import { TChartParams } from '@utils/types/IStatistics';

import * as Styles from './SenseDetails.styles';
import { graphData, fakeInformation } from './mockup';

const RareOnTheInternetAlternativeResults: React.FC = () => {
  const options = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      trigger: 'item',
      formatter(params: TChartParams) {
        const item = fakeInformation.find(i => i.id === params.name);
        if (item) {
          return `
            <div class="tooltip-wrapper max-w-280">
              <div class="tooltip-name">${item.name}</div>
              <div class="tooltip-url">${item.url}</div>
              <div class="tooltip-content-wrapper">
                <div class="tooltip-item">
                  <div class="label">Relevant Text String in Results:</div>
                  <div class="description">${item.description}</div>
                </div>
              </div>
            </div>
          `;
        }
        return `
          <div>
            <div>${params.name}</div>
          </div>
        `;
      },
    },
    series: [
      {
        type: 'graph',
        data: graphData.nodes.map(node => ({
          x: node.x,
          y: node.y,
          id: node.id,
          name: node.label,
          symbolSize: node.size,
          symbol: node.symbol,
        })),
        edges: graphData.edges.map(edge => ({
          source: edge.sourceID,
          target: edge.targetID,
        })),
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        roam: true,
        lineStyle: {
          width: 0.5,
          curveness: 0.3,
          opacity: 0.7,
        },
      },
    ],
  };

  return (
    <Styles.ContentItem>
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '500px' }} />
    </Styles.ContentItem>
  );
};

export default RareOnTheInternetAlternativeResults;
