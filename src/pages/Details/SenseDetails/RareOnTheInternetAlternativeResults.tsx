import ReactECharts from 'echarts-for-react';

import { decompress_zstd_compressed_data_func } from '@utils/helpers/encryption';
import { TChartParams } from '@utils/types/IStatistics';
import { TCurrentNode, TCurrentNodeEdges } from '@utils/types/ITransactions';

import * as Styles from './SenseDetails.styles';

interface IRareOnTheInternetAlternativeResults {
  data: string;
}

const RareOnTheInternetAlternativeResults: React.FC<IRareOnTheInternetAlternativeResults> = ({
  data,
}) => {
  if (!data) {
    return null;
  }
  const newData = JSON.parse(data);
  if (
    Object.keys(newData).length <= 2 ||
    newData.alternative_rare_on_internet_dict_as_json_compressed_b64.length
  ) {
    return null;
  }

  const processRareOnInternetAlternativeDataFunc = () => {
    const uncompressedAlternativeRareOnInternetDictJsonObj = decompress_zstd_compressed_data_func(
      newData.alternative_rare_on_internet_dict_as_json_compressed_b64,
    );
    const ir_obj = uncompressedAlternativeRareOnInternetDictJsonObj;
    const ir_obj_keys = Object.keys(ir_obj);
    const ir_obj_keys_length = ir_obj_keys.length;
    if (ir_obj_keys_length < 3) {
      return { nodes: [], links: [] };
    }
    const listOfTextStrings = Object.values(ir_obj.list_of_text_strings);
    const { alternative_rare_on_internet_graph_json_compressed_b64 } = ir_obj;
    const internet_rareness_alternative_graph_data = decompress_zstd_compressed_data_func(
      alternative_rare_on_internet_graph_json_compressed_b64,
    );

    let text_strings_on_page = listOfTextStrings.join('\r\n');
    const max_length_of_text_string_on_page = 500;
    text_strings_on_page = text_strings_on_page.substring(0, max_length_of_text_string_on_page);

    const keys = Object.keys(internet_rareness_alternative_graph_data);
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] === 'nodes') {
        const keys2 = Object.keys(internet_rareness_alternative_graph_data[keys[i]]);
        const values2 = Object.values(
          internet_rareness_alternative_graph_data[keys[i]],
        ) as TCurrentNode[];
        for (let j = 0; j < keys2.length; j += 1) {
          const current_node: TCurrentNode = values2[j];
          current_node.text_strings_on_page = text_strings_on_page;
          internet_rareness_alternative_graph_data.nodes[keys2[j]] = current_node;
        }
      }
    }

    return {
      nodes: internet_rareness_alternative_graph_data.nodes,
      edges: internet_rareness_alternative_graph_data.links.map((item: TCurrentNodeEdges) => ({
        source: item.source.id,
        target: item.target.id,
      })),
    };
  };

  let internetRarenessAlternativeGraphData: TCurrentNode[] = [];
  let edgesData = [];
  if (newData.rare_on_internet_summary_table_as_json_compressed_b64.length > 100) {
    const { nodes, edges } = processRareOnInternetAlternativeDataFunc();
    internetRarenessAlternativeGraphData = nodes;
    edgesData = edges;
  }

  const options = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      trigger: 'item',
      formatter(params: TChartParams) {
        const item = internetRarenessAlternativeGraphData.find(
          i => i.id === parseInt(params.name, 10),
        );
        if (item) {
          return `
            <div class="tooltip-wrapper max-w-280">
              <div class="tooltip-name">${item.img_alt}</div>
              <div class="tooltip-url">${item.img_src}</div>
              <div class="tooltip-content-wrapper">
                <div class="tooltip-item">
                  <div class="label">Relevant Text String in Results:</div>
                  <div class="description">${item.text_strings_on_page}</div>
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
        data: internetRarenessAlternativeGraphData.map(node => ({
          x: node.x,
          y: node.y,
          id: node.id,
          name: node.id,
          symbolSize: node.node_size,
          symbol: `image://data:image/jpg;base64,${node.image_base64_string}`,
        })),
        edges: edgesData,
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
      <ReactECharts notMerge={false} lazyUpdate option={options} style={{ height: '400px' }} />
    </Styles.ContentItem>
  );
};

export default RareOnTheInternetAlternativeResults;
