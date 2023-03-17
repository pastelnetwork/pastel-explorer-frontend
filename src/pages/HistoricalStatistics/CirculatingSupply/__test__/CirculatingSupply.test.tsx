import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import 'jest-styled-components';

import i18next from '../../../../utils/helpers/i18n';
import CirculatingSupply from '../index';

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
const mockStore = configureMockStore();
const store = mockStore({});

describe('pages/HistoricalStatistics/CirculatingSupply', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <CirculatingSupply />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
