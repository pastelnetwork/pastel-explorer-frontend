import LZUTF8 from 'lzutf8';
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
    LZUTF8.decompress = jest.fn().mockImplementationOnce(() => {
      return JSON.stringify(initial);
    });
    const lzutf8Spy = jest.spyOn(LZUTF8, 'decompress');
    const jsonSpy = jest.spyOn(JSON, 'parse');
    readCacheValue('key');
    expect(lzutf8Spy).toBeCalledTimes(1);
    expect(jsonSpy).toBeCalledTimes(2);
  });
});
