import * as fzstd from 'fzstd';

import { decompress_zstd_compressed_data_func } from '../encryption';

type TfzstdProps = {
  decompress: (_dat: Uint8Array, _buf?: Uint8Array | undefined) => Uint8Array;
};

describe('utils/helpers/encryption', () => {
  test('decompress_zstd_compressed_data_func should works correctly', () => {
    const initial = { alternative_rare_on_internet_graph_json_compressed_b64: 'content' };
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return initial;
    });
    const jsonSpy = jest.spyOn(JSON, 'parse');
    const fzstd1: TfzstdProps = { decompress: fzstd.decompress };
    jest
      .spyOn(fzstd1, 'decompress')
      .mockReturnValue(
        new Uint8Array([
          0x28, 0xb5, 0x2f, 0xfd, 0x24, 0x02, 0x11, 0x00, 0x00, 0x4f, 0x6b, 0x64, 0x50, 0xa9, 0x5a,
        ]),
      );
    expect(decompress_zstd_compressed_data_func('KLUv/SQCEQAAe33RlPJ6')).toEqual(initial);
    decompress_zstd_compressed_data_func('KLUv/SQCEQAAe33RlPJ6');
    expect(jsonSpy).toBeCalledTimes(2);
  });
  test('decompress_zstd_compressed_data_func should works incorrectly', () => {
    expect(decompress_zstd_compressed_data_func('test')).toEqual({});
  });
});
