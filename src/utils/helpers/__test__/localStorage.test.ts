import LZString from 'lz-string';
import { setCacheValue, readCacheValue } from '../localStorage';

describe('utils/helpers/localStorage', () => {
  test('setCacheValue should works correctly', () => {
    expect(setCacheValue('key', 'message')).toEqual(true);
  });

  test('readCacheValue should works correctly', () => {
    const now = Date.now();
    const initial = { currentCache: { '30d': 'content' }, lastDate: now };
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return initial;
    });
    LZString.decompress = jest.fn().mockImplementationOnce(() => {
      return JSON.stringify(initial);
    });
    const lzutf8Spy = jest.spyOn(LZString, 'decompress');
    const jsonSpy = jest.spyOn(JSON, 'parse');
    readCacheValue('key');
    expect(lzutf8Spy).toBeCalledTimes(1);
    expect(jsonSpy).toBeCalledTimes(2);
  });
});
