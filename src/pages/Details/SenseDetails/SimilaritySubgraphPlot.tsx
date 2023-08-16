import ReactECharts from 'echarts-for-react';

import { TSubgraph } from '@utils/types/ITransactions';
import { TChartParams } from '@utils/types/IStatistics';
import { translateDropdown } from '@utils/helpers/i18n';

import * as Styles from './SenseDetails.styles';

interface ISimilaritySubgraphPlot {
  data: TSubgraph;
}

const SimilaritySubgraphPlot: React.FC<ISimilaritySubgraphPlot> = ({ data }) => {
  const options = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      trigger: 'item',
      formatter(params: TChartParams) {
        const item = data.nodes.find(i => i.id === params.name);
        if (item) {
          return `
            <div class="tooltip-wrapper max-w-280">
              <div class="tooltip-name">${item.fileHash}</div>
              <div class="tooltip-url">${item.imgLink}</div>
              <div class="tooltip-content-wrapper">
                <div class="tooltip-item">
                  <div class="label">${translateDropdown(
                    'pages.senseDetails.senseRarenessScore',
                  )}:</div>
                  <div class="value">${item.rarenessScore}</div>
                </div>
                <div class="tooltip-item">
                  <div class="label">${translateDropdown('pages.senseDetails.openNSFWScore')}:</div>
                  <div class="value">${item.openNsfwScore}</div>
                </div>
                <div class="tooltip-item">
                  <div class="label">${translateDropdown('pages.senseDetails.isLikelyDupe')}:</div>
                  <div class="value">${item.isLikelyDupe?.toString()}</div>
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
        data: data.nodes.map(node => ({
          x: node.x,
          y: node.y,
          id: node.id,
          name: node.id,
          symbol: `image://${node.imgLink}`,
          symbolSize: node.size,
        })),
        edges: data.edges.map(edge => ({
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
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
    </Styles.ContentItem>
  );
};

export default SimilaritySubgraphPlot;
