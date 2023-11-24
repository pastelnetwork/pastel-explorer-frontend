import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../../utils/helpers/i18n';
import { themeLight } from '../../../../theme';
import BlockDetails from '../BlockDetails';

jest.mock('react-router-dom', () => ({
  Link: jest.requireActual('react-router-dom').Link,
  useParams: () => ({
    id: '15420',
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

describe('pages/BlockDetails', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <BlockDetails />
      </ThemeProvider>
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
