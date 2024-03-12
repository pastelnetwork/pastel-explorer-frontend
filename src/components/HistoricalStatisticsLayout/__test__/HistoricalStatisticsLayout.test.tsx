import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
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
    <Router>
      <Switch>
        <HistoricalStatisticsLayout currentBgColor={CHART_THEME_BACKGROUND_DEFAULT_COLOR}>
          <div>Content</div>
        </HistoricalStatisticsLayout>
      </Switch>
    </Router>,
  );

  const page = mount(
    <div>
      <Router>
        <Switch>
          <Route
            element={
              <HistoricalStatisticsLayout currentBgColor={CHART_THEME_BACKGROUND_DEFAULT_COLOR}>
                <div>Content</div>
              </HistoricalStatisticsLayout>
            }
          />
        </Switch>
      </Router>
    </div>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <NavigateBeforeIcon>', () => {
    expect(page.html().search('MuiSvgIcon-root')).toBeDefined();
  });

  test('should render <Dropdown>', () => {
    expect(page.html().search('MuiSelect-select')).toBeDefined();
  });

  test('should render <Styles.BackButtonWrapper>', () => {
    expect(page.html().search(Styles.BackButtonWrapper.toString())).toBeDefined();
  });

  test('should render <Styles.BackButton>', () => {
    expect(page.html().search(Styles.BackButton.toString())).toBeDefined();
  });

  test('should render <Styles.DropdownWrapper>', () => {
    expect(page.html().search(Styles.DropdownWrapper.toString())).toBeDefined();
  });

  test('should render <Styles.ChartWrapper>', () => {
    expect(page.html().search(Styles.ChartWrapper.toString())).toBeDefined();
  });
});
