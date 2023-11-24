import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import { Dropdown } from '../Dropdown';
import * as Styles from '../Dropdown.styles';

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

describe('components/Dropdown', () => {
  const value = '1';
  const options = [
    {
      name: 'Option 1',
      value: '1',
    },
    {
      name: 'Option 2',
      value: '2',
    },
  ];
  const onChange = () => {
    // TODO
  };
  const wrapper = shallow(<Dropdown value={value} options={options} onChange={onChange} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <DateRangeIcon>', () => {
    expect(wrapper.find(MenuItem).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Select>', () => {
    expect(wrapper.find(Select).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBeGreaterThanOrEqual(1);
  });
});
