import { shallow } from 'enzyme';
import { Skeleton } from '@material-ui/lab';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import { Dropdown } from '../../Dropdown/Dropdown';
import i18next from '../../../utils/helpers/i18n';
import { CHART_THEME_BACKGROUND_DEFAULT_COLOR } from '../../../utils/constants/statistics';
import HistoricalStatisticsLayout from '../HistoricalStatisticsLayout';
import * as Styles from '../HistoricalStatisticsLayout.styles';

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

describe('components/HistoricalStatisticsLayout', () => {
  const wrapper = shallow(
    <HistoricalStatisticsLayout currentBgColor={CHART_THEME_BACKGROUND_DEFAULT_COLOR}>
      <div>Content</div>
    </HistoricalStatisticsLayout>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <NavigateBeforeIcon>', () => {
    expect(wrapper.find(NavigateBeforeIcon).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Dropdown>', () => {
    expect(wrapper.find(Dropdown).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.BackButtonWrapper>', () => {
    expect(wrapper.find(Styles.BackButtonWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.BackButton>', () => {
    expect(wrapper.find(Styles.BackButton).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ChartWrapper>', () => {
    expect(wrapper.find(Styles.ChartWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Skeleton>', () => {
    expect(wrapper.find(Skeleton).length).toBe(0);
  });
});
