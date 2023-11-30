import { shallow } from 'enzyme';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import OfferTicket from '../OfferTicket';
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
}) as MyMockType;

describe('components/OfferTicket', () => {
  const ticket = {
    type: 'offer',
    version: 0,
    pastelID:
      'jXac5N8FdQWM354v9zpk2rEqfuWGXfeti2EuV44AgFsxiJWHzdxhprjD68cgr3H8qUJ5gydmXjYKqQ9ubF131s',
    item_txid: '6b43be16291af3b546fa4309d42497fc01927f1898eebb09e1bc9541e4d8f582',
    nft_txid: '7b43be16291af3b546fa4309d42497fc01927f1898eebb09e1bc9541e4d8f582',
    copy_number: 1,
    asked_price: 1,
    valid_after: 0,
    valid_before: 0,
    locked_recipient:
      'jXZqgvtqGERZuAbNkEXV1WXonpay98zUUgTk4AWwx2vSJq42vBxwyvwQZ36dVEAkBVB6sYqPh46SvktveCA93L',
    signature:
      '884cb82675f4eca59a7fbdac7bb093884bc9cca8749bbe43b81b2e5871576b14d1b3fd157fa8a8c2e787cc44ef451e9cdb4568f8c1a949d100e0af5738abbf4cdc85e06614c194d2ce3943823fb5ffb4fbf210330442f94067aafcf7f240108feeca31f19c1c0f465919b7c8ff59a9ab2800',
    image: '',
    transactionTime: 1675206868000,
    otherData: {
      offerType: '',
      txId: '',
      regTxId: '',
      ticketType: '',
      ticketId: '',
    },
  };
  const wrapper = shallow(<OfferTicket ticket={ticket} />);

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
