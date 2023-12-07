import { shallow } from 'enzyme';

import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../../../utils/helpers/i18n';
import BlockVisualization from '../BlockVisualization';

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

describe('pages/Statistics/BlockStatistics/BlockVisualization', () => {
  const data = {
    id: '245684',
    transactionCount: '3',
    height: '245684',
    size: '2.5kB',
    minutesAgo: '3 minutes',
    ticketsCount: '0',
  };
  const wrapper = shallow(<BlockVisualization {...data} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
