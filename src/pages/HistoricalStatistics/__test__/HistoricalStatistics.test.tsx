import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import HistoricalStatistics from '../index';
import * as Styles from '../StatisticsOvertime.styles';

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

describe('pages/HistoricalStatistics', () => {
  const wrapper = shallow(<HistoricalStatistics />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Link>', () => {
    expect(wrapper.find(Link).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ContentWrapper>', () => {
    expect(wrapper.find(Styles.ContentWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.CardItem>', () => {
    expect(wrapper.find(Styles.CardItem).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.BlockTitle>', () => {
    expect(wrapper.find(Styles.BlockTitle).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ChartImage>', () => {
    expect(wrapper.find(Styles.ChartImage).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <img>', () => {
    expect(wrapper.find('img').length).toBeGreaterThanOrEqual(1);
  });
});
