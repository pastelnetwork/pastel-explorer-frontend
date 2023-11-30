import { shallow } from 'enzyme';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import NFTActivationTicket from '../NFTActivationTicket';
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

describe('components/NFTActivationTicket', () => {
  const ticket = {
    creator_height: 147573,
    pastelID:
      'jXYpteB4PBusbct9GgVZQYABshppSZ2eqQHBJMdQzRU3Si7BybowHFfuyfES6kq9hWp8GWcPRvrNfj576jc44x',
    reg_txid: 'df2d19bd534fd65005bfd5b25044e0b9f9171ab98291d3637c8edd2072eac3d1',
    signature:
      'fab240c360a3c31f20e759ab19db4f09ed64586ec24904b72f1834e9c82e908ae227ebce5956a3acf7e6851884082693d19d5366d646dbf080c1d53c2bb990327325df95fedc8502dbade63b99c1143bd884111469596168e16863f447dc63b0ba5825b0b0319cb351b67eedb39dccfb3e00',
    storage_fee: 137,
    type: 'nft-act',
    version: 0,
    transactionTime: 1660256540000,
    activation_ticket: null,
    height: 147589,
  };
  const wrapper = shallow(<NFTActivationTicket ticket={ticket} />);

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
