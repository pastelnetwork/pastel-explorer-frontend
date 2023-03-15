import { decode } from '../ascii85';

JSON.parse = jest.fn().mockImplementationOnce(() => {
  return { hash: '8a9645d98a764596b2b8b96a364db547c1a060a04a4599d5475d4f77ecaa6515' };
});

describe('utils/helpers/ascii85', () => {
  test('decode should works correctly', () => {
    expect(decode("-[R%\\@;L't,!$oiATMr;I4#")).toEqual({
      hash: '8a9645d98a764596b2b8b96a364db547c1a060a04a4599d5475d4f77ecaa6515',
    });
  });

  test('decode should works incorrectly', () => {
    expect(
      decode('8a9645d98a764596b2b8b96a364db547c1a060a04a4599d5475d4f77ecaa6515'),
    ).toBeUndefined();
  });
});
