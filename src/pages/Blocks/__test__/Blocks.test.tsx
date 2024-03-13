import { shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';
import i18next from '../../../utils/helpers/i18n';
import ReduxProvider from '../../../__mock__/ReduxProvider';
import Blocks from '../Blocks';
import * as Styles from '../Blocks.styles';

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

const initialMockStore = {
  dateRange: null,
  dropdownType: [],
  customDateRange: {
    startDate: 0,
    endDate: null,
  },
};
const mockStore = configureMockStore();
const store = mockStore(initialMockStore);

describe('pages/Blocks', () => {
  const wrapper = shallow(
    <div>
      <Router>
        <Switch>
          <Route
            element={
              <ReduxProvider store={store}>
                <Blocks />
              </ReduxProvider>
            }
          />
        </Switch>
      </Router>
    </div>,
  );
  const page = render(
    <div>
      <Router>
        <Switch>
          <Route
            element={
              <ReduxProvider store={store}>
                <Blocks />
              </ReduxProvider>
            }
          />
        </Switch>
      </Router>
    </div>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should render table', () => {
    expect(page.cheerio.search('ReactVirtualized__Table')).toBeDefined();
  });

  test('should render dropdown', () => {
    expect(page.cheerio.search('MuiSelect-select')).toBeDefined();
  });

  test('should render Styles.TableContainer', () => {
    expect(page.cheerio.search(Styles.TableContainer.toString())).toBeDefined();
  });

  test('should render ChartStyles.CSVLinkButton', () => {
    expect(page.cheerio.search(ChartStyles.CSVLinkButton.toString())).toBeDefined();
  });
});
