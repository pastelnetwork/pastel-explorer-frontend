import ReactECharts from 'echarts-for-react';
import parse from 'html-react-parser';

import { TChartParams } from '@utils/types/IStatistics';
import { decompress_zstd_compressed_data_func } from '@utils/helpers/encryption';
import { TCurrentNode, TEdges } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './SenseDetails.styles';

interface IRareOnTheInternetResultsGraph {
  data: string;
}

const RareOnTheInternetResultsGraph: React.FC<IRareOnTheInternetResultsGraph> = ({ data }) => {
  if (!data) {
    return <Styles.ContentItem className="min-height-400" />;
  }
  const newData = JSON.parse(data);
  if (
    Object.keys(newData).length <= 2 ||
    newData.rare_on_internet_summary_table_as_json_compressed_b64.length <= 100
  ) {
    return <Styles.ContentItem className="min-height-400" />;
  }

  const processRareOnInternetDataFunc = () => {
    try {
      const internetRarenessGraphData = decompress_zstd_compressed_data_func(
        newData.rare_on_internet_graph_json_compressed_b64,
      );
      const keys = Object.keys(internetRarenessGraphData);
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] === 'nodes') {
          const keys2 = Object.keys(internetRarenessGraphData[keys[i]]);
          const values2 = Object.values(internetRarenessGraphData[keys[i]]) as TCurrentNode[];
          for (let j = 0; j < keys2.length; j += 1) {
            const current_node: TCurrentNode = values2[j];
            const current_node_size = 0.9 ** (current_node.search_result_ranking + 1) * 15;
            current_node.node_size = current_node_size;
            internetRarenessGraphData.nodes[keys2[j]] = current_node;
          }
        }
      }
      return {
        nodes: internetRarenessGraphData.nodes as TCurrentNode[],
        edges: internetRarenessGraphData.links as TEdges[],
      };
    } catch (error) {
      return {
        nodes: [],
        edges: [],
      };
    }
  };
  const { nodes, edges } = processRareOnInternetDataFunc();
  const options = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      trigger: 'item',
      formatter(params: TChartParams) {
        const item = nodes.find(i => i.id === parseInt(params.name, 10));
        if (item) {
          return `
            <div class="tooltip-wrapper max-w-280">
              <div class="tooltip-name">${item.title}</div>
              <div class="tooltip-url">${item.original_url}</div>
              <div class="tooltip-content-wrapper">
                <div class="tooltip-item">
                  <div class="label">${translate('pages.senseDetails.resultRanking')}:</div>
                  <div class="value">${item.search_result_ranking}</div>
                </div>
                <div class="tooltip-item">
                  <div class="label">${translate(
                    'pages.senseDetails.originalImageResolution',
                  )}:</div>
                  <div class="value">${parse(item.resolution_string)}</div>
                </div>
                <div class="tooltip-item">
                  <div class="label">${translate('pages.senseDetails.imageDate')}:</div>
                  <div class="value">${item.date_string}</div>
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
        layout: 'force',
        animation: false,
        data: nodes.map(node => ({
          id: node.id,
          name: node.id,
          symbolSize: node.node_size,
          symbol: `image://${node.img_src_string}`,
        })),
        edges,
        label: {
          show: false,
        },
        roam: true,
        emphasis: {
          label: {
            show: false,
          },
        },
        force: {
          repulsion: 3000,
          edgeLength: 100,
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

export default RareOnTheInternetResultsGraph;
