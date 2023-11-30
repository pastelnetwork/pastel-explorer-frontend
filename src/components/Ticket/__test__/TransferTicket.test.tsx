import { shallow } from 'enzyme';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import TransferTicket from '../TransferTicket';
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

describe('components/TransferTicket', () => {
  const ticket = {
    type: 'transfer',
    version: 0,
    pastelID:
      'jXYPomtuN9fTrREPpneTqSP5jQU5YvCuPnNjTTRw8oigUBwgUW55kVmzGiAjhzrQ3Rs9hpwTyQmG9nRfeotxLu',
    accept_txid: '6f667bc2141c8631e4f272632f3569962e3a75685ba69866bd3963fbca2f1e2d',
    item_txid: '1ca1089a7d64a2dc29318836bfddd28451cc721ec2a1a7a2c752a827eb793e22',
    offer_txid: '837ba17393461a9f424c0f536fb3527c8ac5e243eaca9781b08fda406e1e23f1',
    registration_txid: '1060e97461b30a6ba3e94c88f37350a23ebf04e096b2dacd1584007b045c454d',
    copy_serial_nr: '1',
    nft_txid: '1ca1089a7d64a2dc29318836bfddd28451cc721ec2a1a7a2c752a827eb793e22',
    signature:
      'a7d24beb5b5ad0f7d4c9865eac49302f99be8e0266eebeead2c91b4d07a4e25a0d4b6513b2941ed8361a6a5ffcd6a42734acfb4154ba854980378773a455533f011dc37384b84a1b1cf3073e10e83aef5f34ae78e3a3dbe8ae15d3a5e59069f7500073dddafdca10c12931f0b267bd472b00',
    transactionTime: 1674520491000,
    image: '',
    otherData: {
      offerType: '',
      txId: '',
      regTxId: '',
      ticketType: '',
      ticketId: '',
    },
  };
  const wrapper = shallow(<TransferTicket ticket={ticket} />);

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
