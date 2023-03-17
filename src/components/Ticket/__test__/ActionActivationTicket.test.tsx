import { shallow } from 'enzyme';
import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import ActionActivationTicket from '../ActionActivationTicket';

jest.mock('i18next-http-backend');
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            // noop
          }),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {
      // noop
    },
  },
}));
i18next.t = jest.fn().mockImplementation((...arg) => {
  return arg[0];
});

describe('components/ActionActivationTicket', () => {
  const ticket = {
    type: 'action-act',
    version: 1,
    pastelID:
      'jXXcKdSL8XAd1kMCkBwe4vMfyZj4Jo5D63nnGzZuXGZuPS7qjax8SayHDHj4Erk2kThZvH7JuoX9PkDeS3q8TY',
    reg_txid: 'ead40b73c1f1c8d5a551a3f05a8d8030651c84f026f0ee865ecf1666c0eb6255',
    called_at: 154620,
    storage_fee: 65,
    signature:
      '3424e8a2ecbef0064193d503754bde123693089ae26ae9838cab09be15eea95b79f68d9d186120c733bbfd0c37d6fa553c3c6a56c4329f19000b9c74e5473b82bef35bd21bfaac958cdadd46fd92f5502ddbb741f74cfcc6db885d998d3e923d5cf10cbdbf18ca27be6f844575c7953f3a00',
    transactionTime: 1678937408698,
  };
  const wrapper = shallow(<ActionActivationTicket ticket={ticket} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
