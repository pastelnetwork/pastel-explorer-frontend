import { shallow } from 'enzyme';
import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import TicketsType from '../TicketsType';

jest.mock('react-router-dom', () => ({
  Link: jest.requireActual('react-router-dom').Link,
  useParams: () => ({
    type: 'nft-reg',
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
});

describe('pages/TicketsType', () => {
  const wrapper = shallow(<TicketsType />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
