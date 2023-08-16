import ReactECharts from 'echarts-for-react';
import parse from 'html-react-parser';

import { TChartParams } from '@utils/types/IStatistics';
import { decompress_zstd_compressed_data_func } from '@utils/helpers/encryption';
import { TCurrentNode, TEdges } from '@utils/types/ITransactions';
import { translateDropdown } from '@utils/helpers/i18n';

import { rareOnTheInternetResultsGraphData } from './mockup';
import EmptyOverlay from './EmptyOverlay';
import * as Styles from './SenseDetails.styles';

interface IRareOnTheInternetResultsGraph {
  data: string;
}

const RareOnTheInternetResultsGraph: React.FC<IRareOnTheInternetResultsGraph> = ({ data }) => {
  const newData = JSON.parse(data);
  const processRareOnInternetDataFunc = () => {
    if (
      !data ||
      Object.keys(newData).length <= 2 ||
      newData?.rare_on_internet_summary_table_as_json_compressed_b64?.length <= 100
    ) {
      return {
        nodes: [],
        edges: [],
      };
    }

    try {
      const internetRarenessGraphData = decompress_zstd_compressed_data_func(
        newData.rare_on_internet_graph_json_compressed_b64,
      );
      const keys = Object.keys(internetRarenessGraphData);
      if (keys.length) {
        for (let i = 0; i < keys.length; i += 1) {
          if (keys[i] === 'nodes') {
            const keys2 = Object.keys(internetRarenessGraphData[keys[i]]);
            const values2 = Object.values(internetRarenessGraphData[keys[i]]) as TCurrentNode[];
            for (let j = 0; j < keys2.length; j += 1) {
              const current_node: TCurrentNode = values2[j];
              const current_node_size = 0.9 ** (current_node?.search_result_ranking + 1) * 15;
              current_node.node_size = current_node_size;
              internetRarenessGraphData.nodes[keys2[j]] = current_node;
            }
          }
        }
        return {
          nodes: internetRarenessGraphData.nodes as TCurrentNode[],
          edges: internetRarenessGraphData.links as TEdges[],
        };
      }
      return {
        nodes: [],
        edges: [],
      };
    } catch (error) {
      return {
        nodes: [],
        edges: [],
      };
    }
  };
  const { nodes, edges } = processRareOnInternetDataFunc();

  const getSymbol = (node: TCurrentNode) => {
    if (node?.misc_related_images_as_b64_strings) {
      let src = node.misc_related_images_as_b64_strings;
      if (src.indexOf(';base64') === -1) {
        src = `data:image/jpeg;base64,${node.misc_related_images_as_b64_strings}`;
      }
      return `image://${src}`;
    }
    if (node?.misc_related_images_urls) {
      return `image://${node?.misc_related_images_urls}`;
    }
    return `image://${node?.img_src_string}`;
  };

  let force = null;
  let zoom = 1;
  if (nodes.length && nodes.length <= 5) {
    force = {
      edgeLength: 5,
      repulsion: 5,
    };
    zoom = 20;
  } else {
    force = {
      edgeLength: 200,
    };
  }
  const options = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      trigger: 'item',
      formatter(params: TChartParams) {
        const item = nodes.find(i => i.id === parseInt(params.name, 10));
        if (item) {
          let relatedImagesUrls = '';
          if (item?.misc_related_images_urls) {
            relatedImagesUrls = `<div class="tooltip-item">
            <div class="label">${translateDropdown('pages.senseDetails.relatedImages')}:</div>
            <div class="value"><img class="tooltip-image" src="${
              item.misc_related_images_urls
            }" /></div>
          </div>`;
          } else if (item?.misc_related_images_as_b64_strings) {
            let src = item.misc_related_images_as_b64_strings;
            if (src.indexOf(';base64') === -1) {
              src = `data:image/jpeg;base64,${item.misc_related_images_as_b64_strings}`;
            }
            relatedImagesUrls = `<div class="tooltip-item">
            <div class="label">${translateDropdown('pages.senseDetails.relatedImages')}:</div>
            <div class="value"><img class="tooltip-image" src="${src}" /></div>
          </div>`;
          }

          let dateString = '';
          if (item?.date_string) {
            dateString = `<div class="tooltip-item">
            <div class="label">${translateDropdown('pages.senseDetails.imageDate')}:</div>
            <div class="value">${item.date_string}</div>
          </div>`;
          }
          return `
            <div class="tooltip-wrapper max-w-280">
              <div class="tooltip-name">${item.title}</div>
              <div class="tooltip-url">${item.original_url}</div>
              <div class="tooltip-content-wrapper">
                <div class="tooltip-item">
                  <div class="label">${translateDropdown('pages.senseDetails.resultRanking')}:</div>
                  <div class="value">${item.search_result_ranking}&nbsp;</div>
                </div>
                <div class="tooltip-item">
                  <div class="label">${translateDropdown(
                    'pages.senseDetails.originalImageResolution',
                  )}:</div>
                  <div class="value">${parse(item.resolution_string)}&nbsp;</div>
                </div>
                ${dateString}
                ${relatedImagesUrls}
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
        data: (!nodes.length ? rareOnTheInternetResultsGraphData.nodes : nodes).map(node => ({
          id: node.id,
          name: node.id,
          symbolSize: node.node_size,
          symbol: getSymbol(node as TCurrentNode),
        })),
        edges: !nodes.length ? rareOnTheInternetResultsGraphData.edges : edges,
        label: {
          show: false,
        },
        roam: true,
        zoom,
        emphasis: {
          label: {
            show: false,
          },
        },
        force,
      },
    ],
  };

  return (
    <Styles.ContentItem className="chart-section">
      <div className={!nodes.length ? 'empty' : ''}>
        <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
      </div>
      <EmptyOverlay isShow={!nodes.length} />
    </Styles.ContentItem>
  );
};

export default RareOnTheInternetResultsGraph;
