import * as fzstd from 'fzstd';

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
  const compressedBuf = prepare_data_for_zstd(compressed_data_input);
  const compressed_data = new Uint8Array(compressedBuf);
  const decompressed_data = fzstd.decompress(compressed_data);
  const enc = new TextDecoder('utf-8');
  return decompressed_data.length ? JSON.parse(enc.decode(decompressed_data)) : {};
};
