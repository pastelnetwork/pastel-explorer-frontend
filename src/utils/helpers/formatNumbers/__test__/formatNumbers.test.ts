import { formatNumber } from '../formatNumbers';

describe('utils/helpers/formatNumbers', () => {
  test('formatNumber should works correctly', () => {
    const value = 1678681807888;
    expect(formatNumber(value)).toEqual('1,678,681,807,888');
  });

  test('formatNumber should works correctly with prefix', () => {
    const value = 1678681807888;
    expect(formatNumber(value, {}, '$')).toEqual('$1,678,681,807,888');
  });

  test('formatNumber should works incorrectly', () => {
    const value = 'incorrectly';
    expect(formatNumber(value)).toEqual('NaN');
  });
});
