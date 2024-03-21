import { shallow } from 'enzyme';
import { Typography, Grid } from '@mui/material';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import Page404 from '../404';
import * as Styles from '../404.styles';

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

describe('pages/Page404', () => {
  const wrapper = shallow(<Page404 />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Typography>', () => {
    expect(wrapper.find(Typography).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ContentWrapper>', () => {
    expect(wrapper.find(Styles.ContentWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Logo>', () => {
    expect(wrapper.find(Styles.Logo).length).toBe(1);
  });

  test('should render <Styles.Button>', () => {
    expect(wrapper.find(Styles.Button).length).toBe(1);
  });
});
