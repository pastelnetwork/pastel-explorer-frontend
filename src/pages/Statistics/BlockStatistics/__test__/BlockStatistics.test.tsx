import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components/macro';

import 'jest-styled-components';

import i18next from '../../../../utils/helpers/i18n';
import { themeLight } from '../../../../theme';
import BlockStatistics from '../BlockStatistics';

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

describe('pages/Statistics/BlockStatistics', () => {
  const blockElements = [
    {
      id: '245684',
      transactionCount: '3',
      height: '245684',
      size: '2.5kB',
      minutesAgo: '3 minutes',
    },
  ];
  const blocksUnconfirmed = null;
  const wrapper = shallow(
    <ThemeProvider theme={themeLight}>
      <BlockStatistics blockElements={blockElements} blocksUnconfirmed={blocksUnconfirmed} />,
    </ThemeProvider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
