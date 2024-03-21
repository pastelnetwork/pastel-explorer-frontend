import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../../utils/helpers/i18n';
import { EChartsLineChart } from '../EChartsLineChart';

const mockStore = configureMockStore();
const store = mockStore({});

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
}) as MyMockType;

describe('pages/HistoricalStatistics/EChartsLineChart', () => {
  const info = {
    connections: 8,
    currencyName: 'PSL',
    disconnected: false,
    latestBlock: 123,
    pslPrice: undefined,
    solps: 245145,
    testnet: true,
    verificationProgress: 4,
    version: 1,
  };
  const handleBgColorChange = jest.fn();
  const wrapper = shallow(
    <Provider store={store}>
      <EChartsLineChart
        chartName="Line"
        info={info}
        offset={0}
        handleBgColorChange={handleBgColorChange}
      />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
