import { shallow } from 'enzyme';
import { Grid } from '@mui/material';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import Table from '../../../components/Table/Table';
import i18next from '../../../utils/helpers/i18n';
import Richlist from '../Richlist';
import * as Styles from '../Richlist.styles';

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

describe('pages/Richlist', () => {
  const wrapper = shallow(<Richlist />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Table>', () => {
    expect(wrapper.find(Table).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.BlockWrapper>', () => {
    expect(wrapper.find(Styles.BlockWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Title>', () => {
    expect(wrapper.find(Styles.Title).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ContentWrapper>', () => {
    expect(wrapper.find(Styles.ContentWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Info>', () => {
    expect(wrapper.find(Styles.Info).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.InfoItem>', () => {
    expect(wrapper.find(Styles.InfoItem).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Chart>', () => {
    expect(wrapper.find(Styles.Chart).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.GridWrapper>', () => {
    expect(wrapper.find(Styles.GridWrapper).length).toBeGreaterThanOrEqual(1);
  });
});
