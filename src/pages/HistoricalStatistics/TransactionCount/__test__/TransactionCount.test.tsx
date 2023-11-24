import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../../utils/helpers/i18n';
import TransactionCount from '../index';

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
const mockStore = configureMockStore();
const store = mockStore({});

describe('pages/HistoricalStatistics/TransactionCount', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <TransactionCount />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
