import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import InfinityTable from '../InfinityTable';

const mockStore = configureMockStore();
const store = mockStore({});

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

const columns = [
  {
    width: 100,
    flexGrow: 1,
    label: 'ID',
    dataKey: 'id',
    disableSort: false,
  },
  {
    width: 200,
    flexGrow: 1,
    label: 'Name',
    dataKey: 'name',
    disableSort: false,
  },
];
const rows = [
  {
    id: 'd6f9484a-c3a3-11ed-afa1-0242ac120002',
    name: 'David',
  },
  {
    id: 'f05836a2-c3a3-11ed-afa1-0242ac120002',
    name: 'Henry',
  },
];

describe('components/InfinityTable', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <InfinityTable columns={columns} rows={rows} />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
