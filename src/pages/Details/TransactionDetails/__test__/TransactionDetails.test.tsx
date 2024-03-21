import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../../utils/helpers/i18n';
import TransactionDetails from '../TransactionDetails';

jest.mock('react-router-dom', () => ({
  Link: jest.requireActual('react-router-dom').Link,
  useParams: () => ({
    id: '5c219c1bf6d5a5fe2d368d1b9b7c95786b33e5cf3f86458827c382e3ea4e2453',
  }),
}));
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

describe('pages/TransactionDetails', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <TransactionDetails />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
