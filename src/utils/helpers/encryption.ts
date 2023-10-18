import * as fzstd from 'fzstd';
import JSON5 from 'json5';

const prepare_data_for_zstd = (base64_input_string: string) => {
  const binary_string = window.atob(base64_input_string);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

export const decompress_zstd_compressed_data_func = (compressed_data_input: string) => {
  try {
    const compressedBuf = prepare_data_for_zstd(compressed_data_input);
    const compressed_data = new Uint8Array(compressedBuf);
    const decompressed_data = fzstd.decompress(compressed_data);
    const enc = new TextDecoder('utf-8');
    return decompressed_data.length ? JSON.parse(enc.decode(decompressed_data)) : {};
  } catch {
    return {};
  }
};

type TZstdCompressedData = {
  [key: string]: string;
};
export const decompress_zstd_compressed_data_func_2 = (
  dict_of_zstd_compressed_data_blobs: TZstdCompressedData,
) => {
  const list_of_uncompressed_graphs = [];
  for (let i = 0; i < Object.keys(dict_of_zstd_compressed_data_blobs).length; i += 1) {
    const current_b64_blob = Object.values(dict_of_zstd_compressed_data_blobs)[i];
    const compressedBuf = prepare_data_for_zstd(current_b64_blob);
    const compressed_data = new Uint8Array(compressedBuf);
    const decompressed_data = fzstd.decompress(compressed_data);
    const enc = new TextDecoder('utf-8');
    list_of_uncompressed_graphs[i] = JSON.parse(enc.decode(decompressed_data));
  }
  return list_of_uncompressed_graphs;
};

export const alt_decompress_zstd_compressed_data_func = (compressed_data_input: string) => {
  const compressedBuf = prepare_data_for_zstd(compressed_data_input);
  const compressed_data = new Uint8Array(compressedBuf);
  const decompressed_data = fzstd.decompress(compressed_data);
  const enc = new TextDecoder('utf-8');
  return JSON5.parse(enc.decode(decompressed_data));
};
