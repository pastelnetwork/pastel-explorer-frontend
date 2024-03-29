import { shallow } from 'enzyme';

import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import ExplorerMap from '../../Explorer/ExplorerMap/ExplorerMap';
import SupernodeStatistics from '../../Explorer/SupernodeStatistics/SupernodeStatistics';
import Supernodes from '../Supernodes';
import * as Styles from '../Supernodes.styles';
import * as TableStyles from '../../../components/Table/Table.styles';

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

describe('pages/Supernodes', () => {
  const wrapper = shallow(<Supernodes />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <TableStyles.BlockWrapper>', () => {
    expect(wrapper.find(TableStyles.BlockWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableStyles.BlockTitle>', () => {
    expect(wrapper.find(TableStyles.BlockTitle).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableStyles.PaperWrapper>', () => {
    expect(wrapper.find(TableStyles.PaperWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableStyles.TableWrapper>', () => {
    expect(wrapper.find(TableStyles.TableWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TableStyles.TableCell>', () => {
    expect(wrapper.find(TableStyles.TableCell).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <ExplorerMap>', () => {
    expect(wrapper.find(ExplorerMap).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <SupernodeStatistics>', () => {
    expect(wrapper.find(SupernodeStatistics).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Gird>', () => {
    expect(wrapper.find(Styles.Gird).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ExplorerMapColumn>', () => {
    expect(wrapper.find(Styles.ExplorerMapColumn).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.SupernodeColumn>', () => {
    expect(wrapper.find(Styles.SupernodeColumn).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.BlockWrapper>', () => {
    expect(wrapper.find(Styles.BlockWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.GridWrapper>', () => {
    expect(wrapper.find(Styles.GridWrapper).length).toBeGreaterThanOrEqual(1);
  });
});
