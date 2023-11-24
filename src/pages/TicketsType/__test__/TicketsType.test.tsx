import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import * as TransactionStyles from '../../Details/TransactionDetails/TransactionDetails.styles';
import TicketsType from '../TicketsType';
import TicketsList from '../TicketList';
import * as Styles from '../TicketsType.styles';

jest.mock('react-router-dom', () => ({
  Link: jest.requireActual('react-router-dom').Link,
  useParams: () => ({
    type: 'nft-reg',
  }),
}));

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

describe('pages/TicketsType', () => {
  const wrapper = shallow(<TicketsType />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <CircularProgress>', () => {
    expect(wrapper.find(CircularProgress).length).toBe(1);
  });

  test('should render <TicketsList>', () => {
    expect(wrapper.find(TicketsList).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.TicketsContainer>', () => {
    expect(wrapper.find(Styles.TicketsContainer).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.GridStyle>', () => {
    expect(wrapper.find(Styles.GridStyle).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <TransactionStyles.Loader>', () => {
    expect(wrapper.find(TransactionStyles.Loader).length).toBe(1);
  });
});
