import { shallow } from 'enzyme';

import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import { Dropdown } from '../Dropdown';

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
});
