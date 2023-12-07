import { shallow } from 'enzyme';
import DatePicker from 'react-datepicker';
import DateRangeIcon from '@mui/icons-material/DateRange';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import DateTimePicker from '../DateTimePicker';
import * as Styles from '../DateTimePicker.styles';

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

describe('components/DateTimePicker', () => {
  const wrapper = shallow(<DateTimePicker />);
  wrapper.find(DateRangeIcon).simulate('click');
  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <DatePicker>', () => {
    expect(wrapper.find(DatePicker).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <DateRangeIcon>', () => {
    expect(wrapper.find(DateRangeIcon).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.IconWrapper>', () => {
    expect(wrapper.find(Styles.IconWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.PredefinedWrapper>', () => {
    expect(wrapper.find(Styles.PredefinedWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.SelectedDay>', () => {
    expect(wrapper.find(Styles.SelectedDay).length).toBeGreaterThanOrEqual(1);
  });
});
