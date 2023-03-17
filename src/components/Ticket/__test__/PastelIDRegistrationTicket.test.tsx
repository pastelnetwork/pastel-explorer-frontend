import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import 'jest-styled-components';

import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import PastelIDRegistrationTicket from '../PastelIDRegistrationTicket';
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

describe('components/PastelIDRegistrationTicket', () => {
  const ticket = {
    address: 'tPiqBkkotMT7KBKjo4T5xYVngVnPz2wShS5',
    id_type: 'personal',
    pastelID:
      'jXZrkFx1JdfPvmazux98YEXiCShgGeMFeY6nespN5vEKFKdiKXaMU6xiTJSQUjSFCtxm7x9GoiNLZ9LyQbKdgC',
    pq_key:
      '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',
    signature:
      'c2f079a5659117e9a5af4293edd12a853c6d6ed69de7bac886691eb148b3e65744be5aae5f1ec0a28af97e504a0c0223d922cce8b6e391d000a2836e48f389de0da35b604318ba428eac37edb7f61fd1e3c1928c4321667deac7363199bc8e648317af29fffec709b1690cb9359b38e73800',
    timeStamp: '1675909758',
    type: 'pastelid',
    version: 1,
    transactionTime: 1675909851000,
    activation_ticket: null,
    height: 226608,
  };
  const wrapper = shallow(<PastelIDRegistrationTicket ticket={ticket} />);

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
