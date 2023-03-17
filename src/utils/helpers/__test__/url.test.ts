import { getParameterByName } from '../url';

describe('utils/helpers/url', () => {
  test('getParameterByName should works correctly', () => {
    expect(
      getParameterByName(
        'hash',
        '?txid=ee04a056d162b549fa598ee3966778b19a42227ad1b29c0334fd54536958c657&hash=ff16365674d693d9c28cf760f76ad27f2f258feb008f06193178bc6194b28732',
      ),
    ).toEqual('ff16365674d693d9c28cf760f76ad27f2f258feb008f06193178bc6194b28732');

    expect(
      getParameterByName(
        'param',
        '?txid=ee04a056d162b549fa598ee3966778b19a42227ad1b29c0334fd54536958c657&hash=ff16365674d693d9c28cf760f76ad27f2f258feb008f06193178bc6194b28732',
      ),
    ).toEqual('');
  });
});
