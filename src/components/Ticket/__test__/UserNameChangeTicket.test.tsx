import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import 'jest-styled-components';

import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import UserNameChangeTicket from '../UserNameChangeTicket';
import Signatures from '../Signatures';
import * as Styles from '../Ticket.styles';

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

describe('components/UserNameChangeTicket', () => {
  const ticket = {
    fee: 5000,
    pastelID:
      'jXYDQ9EgqZBmJXNSrAUTQZqSkXqZiHBabyW2Hk7rYR33AXyQiF4oPWjJHXg5XQdYind3ER5yzo7bfn9v8DLiwe',
    signature:
      'e7a4475292553dbc057013a153fbe68b5470a90e1a72eecd23b995f28a36d4607880357cfb04a38af2730f7618c58c9025efffbe9880a1b180c796feb4e1ca215a4be2dc99208eca187fca986ac7dab1146a6af4308be89d356ba9c7414d9c5d822a857c74ae4c58df6a583c9486acd23a00',
    type: 'username-change',
    username: 'Knuckles',
    version: 1,
    transactionTime: 1675924447000,
    activation_ticket: null,
    height: 226704,
  };
  const wrapper = shallow(<UserNameChangeTicket ticket={ticket} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Box>', () => {
    expect(wrapper.find(Box).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <RouterLink>', () => {
    expect(wrapper.find(RouterLink).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Signatures>', () => {
    expect(wrapper.find(Signatures).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.TicketTitle>', () => {
    expect(wrapper.find(Styles.TicketTitle).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.TicketContent>', () => {
    expect(wrapper.find(Styles.TicketContent).length).toBeGreaterThanOrEqual(1);
  });
});
