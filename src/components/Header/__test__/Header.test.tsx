import { shallow } from 'enzyme';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import Header from '../Header';
import * as Styles from '../Header.styles';

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

describe('components/Header', () => {
  const wrapper = shallow(<Header title="Donec a egestas mauris" />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Container>', () => {
    expect(wrapper.find(Styles.Container).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Typography>', () => {
    expect(wrapper.find(Typography).length).toBeGreaterThanOrEqual(1);
  });
});
