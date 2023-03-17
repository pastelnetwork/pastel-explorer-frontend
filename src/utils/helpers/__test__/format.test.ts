import { formatAddress } from '../format';

describe('utils/helpers/format', () => {
  test('formatAddress should works correctly', () => {
    expect(
      formatAddress('cbac7302297b47c0d07ef4765be76f2477c1e7484e0b6f23644808e217f6180e'),
    ).toEqual('cbac7302297b47c0d07e...f6180e');

    expect(formatAddress('tPU7af3oaTez3TrQFKPZR7GuVr8UofPv2kb', 10, -3)).toEqual(
      'tPU7af3oaT...2kb',
    );
  });
});
