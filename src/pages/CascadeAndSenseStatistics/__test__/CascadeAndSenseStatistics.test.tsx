import { shallow } from 'enzyme';

import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import CascadeAndSenseStatistics from '../CascadeAndSenseStatistics';

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

describe('pages/CascadeAndSenseStatistics', () => {
  const wrapper = shallow(<CascadeAndSenseStatistics />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
