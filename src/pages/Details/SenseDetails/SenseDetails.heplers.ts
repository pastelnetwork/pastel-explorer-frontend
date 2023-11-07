import { decompress_zstd_compressed_data_func } from '@utils/helpers/encryption';

export const getInternetRarenessGraphData = (data: string) => {
  const nodes = [];
  let edges = [];
  const newData = JSON.parse(data);
  if (
    Object.keys(newData).length > 2 &&
    newData.rare_on_internet_summary_table_as_json_compressed_b64.length > 100
  ) {
    try {
      const internetRarenessGraphData = decompress_zstd_compressed_data_func(
        newData.rare_on_internet_graph_json_compressed_b64,
      );

      for (let i = 0; i < internetRarenessGraphData.title.length; i += 1) {
        const nodeSize = 0.9 ** (internetRarenessGraphData?.search_result_ranking?.[i] + 1) * 15; // Missing
        nodes.push({
          id: internetRarenessGraphData?.id?.[i], // Missing
          node_size: nodeSize,
          img_src_string: internetRarenessGraphData?.img_src_string?.[i],
          misc_related_images_urls: internetRarenessGraphData?.misc_related_image_url?.[i],
          misc_related_images_as_b64_strings:
            internetRarenessGraphData?.misc_related_image_as_b64_string?.[i],
          date_string: internetRarenessGraphData?.date_string?.[i],
          title: internetRarenessGraphData?.title?.[i],
          original_url: internetRarenessGraphData?.original_url?.[i],
          search_result_ranking: internetRarenessGraphData?.search_result_ranking?.[i], // Missing
          resolution_string: internetRarenessGraphData?.resolution_string?.[i],
        });
      }
      edges = internetRarenessGraphData?.links || [];
    } catch (error) {
      return {
        nodes: [],
        edges: [],
      };
    }
  }
  return {
    nodes,
    edges,
  };
};
