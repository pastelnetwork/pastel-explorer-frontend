import { shallow } from 'enzyme';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import Table from '../Table';
import * as Styles from '../Table.styles';

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
  const wrapper = shallow(<Table headers={headers} rows={rows} isLoading={false} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Styles.BlockWrapper>', () => {
    expect(wrapper.find(Styles.BlockWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.PaperWrapper>', () => {
    expect(wrapper.find(Styles.PaperWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.TableWrapper>', () => {
    expect(wrapper.find(Styles.TableWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <MuiTable>', () => {
    expect(wrapper.find(MuiTable).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableHead>', () => {
    expect(wrapper.find(TableHead).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableRow>', () => {
    expect(wrapper.find(TableRow).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableBody>', () => {
    expect(wrapper.find(TableBody).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.BlockTitle>', () => {
    expect(wrapper.find(Styles.BlockTitle).length).toBe(0);
  });

  test('should render <Styles.TableCell>', () => {
    expect(wrapper.find(Styles.TableCell).length).toBeGreaterThanOrEqual(2);
  });

  test('should render <Styles.RowCell>', () => {
    expect(wrapper.find(Styles.RowCell).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <CircularProgress>', () => {
    const tableWithLoadingWrapper = shallow(<Table headers={headers} rows={rows} isLoading />);
    expect(tableWithLoadingWrapper.find(CircularProgress).length).toBe(1);
  });
});
