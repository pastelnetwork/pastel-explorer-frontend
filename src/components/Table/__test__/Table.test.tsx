import { shallow } from 'enzyme';

import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import Table from '../Table';

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

describe('components/Table', () => {
  const headers = [
    {
      id: 'id',
      header: 'ID',
    },
    {
      id: 'name',
      header: 'Name',
    },
  ];
  const rows = [
    {
      id: '1',
      data: [
        {
          id: 1,
          value: 'Steve',
        },
      ],
    },
  ];
  const wrapper = shallow(<Table headers={headers} rows={rows} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
