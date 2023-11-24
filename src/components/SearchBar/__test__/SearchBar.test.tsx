import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import { themeLight } from '../../../theme';
import i18next from '../../../utils/helpers/i18n';
import SearchBar from '../SearchBar';

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

describe('components/SearchBar', () => {
  const onDrawerToggle = jest.fn();
  const wrapper = shallow(
    <ThemeProvider theme={themeLight}>
      <SearchBar onDrawerToggle={onDrawerToggle} />
    </ThemeProvider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
