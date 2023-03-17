import { shallow } from 'enzyme';
import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import { CHART_THEME_BACKGROUND_DEFAULT_COLOR } from '../../../utils/constants/statistics';
import HistoricalStatisticsLayout from '../HistoricalStatisticsLayout';

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

describe('components/HistoricalStatisticsLayout', () => {
  const wrapper = shallow(
    <HistoricalStatisticsLayout currentBgColor={CHART_THEME_BACKGROUND_DEFAULT_COLOR}>
      <div>Content</div>
    </HistoricalStatisticsLayout>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
