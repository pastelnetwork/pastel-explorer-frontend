import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import 'jest-styled-components';

import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import NFTCollectionRegistrationTicket from '../NFTCollectionRegistrationTicket';
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

describe('components/NFTCollectionRegistrationTicket', () => {
  const ticket = {
    type: 'collection-reg',
    version: 1,
    nft_collection_ticket: '',
    permitted_users: ['permitted_users_1', 'permitted_users_2'],
    key: 'kMCkBwe4vMfyZj4Jo5D63nnGzZ',
    label: 'jXXcKdSL8XAd1kMCkBwe4vMfy',
    creator_height: 15482,
    closing_height: 15485,
    nft_max_count: 6,
    nft_copy_count: 4,
    royalty: 0.4,
    royalty_address: '',
    green: false,
    storage_fee: 65,
    signatures: {
      mn1: {
        jXY3Tv4GS8s74j1kyYuaJeoL1scdDWv11h6TEtYQ9YEkgjaNw4RGnmtZN6Q5kNZRskmrULSD9CmYP19nmZxsmH:
          'wvvlLGfVJczQtk0h7uiLO4EJj49lDBDYZ7v5u8FgyS3XKGAL7BQyFS8ld7kRJX7KT5XHyImKZ0WAIctJnZgcktgYVJr2g+0BxbsLlzlvDvXK1hW3kg135n4OkuIeYuKe+bmd9QCvbT/cNFEvtyeIHCsA',
      },
      mn2: {
        jXZa52oGButM2HsriKkfH5H8F1MTMYQBfudC6oJYHg2ESdDawhF1fMQu8rCmi1T8JYvyNSjgmPM21dDrg8mXyZ:
          'gaxZg1kZ4xjiGX7CRNyUs3HqJXck+HX1Jno1wAno5yrfRMgUEP8ce8YgHv8kV13rVVgiuwAT90OAvTbh1j6T4+3bSWD9qXgj0w7tZi7/1N3nXSSGcILVuROlmzlo5S/9RnoU4GT9sspR0wmao5Mwei4A',
      },
      mn3: {
        jXXunuWpeD3skdNVE5sGyvNquDmHAYw8XasJ1LzdTusJ8DEfgxfeMNR5a318gj8XV8dfkymukCYsp5ZyP3bLE4:
          'JBsfhS695hsHFYDoLew8WdjSYB0v3JEl/LK56VXA7zFw/f2tIASN3atw4xhlHNjxQSZcJByBDS8Az/JNsq3eoyJhFL9glh83PBFJlldpFDL4xWuzHOakEY0eskj7LuGhne7xdBIIaklD2VPhMwSf9DkA',
      },
      principal: {
        jXXkacwPwoVDrsgsxknhqGf6N2G9a9HscVCzLhBxfD3sEJsGE7LVfLQuuGG8z4wqUvkuJ7zWgBHMWBbGPj7Kec:
          'AEHdE4Pr6C9vw+xzHGiDOZXL89krOEw9qtqrBngn5xcBwZTrhlTY+G154kCfIMIb9zcRebM3VLkAuEqcthFSHp8b0sYNNPrKzcCUyCMNHYfEU/SEmm0qb3hgPpMjiS9oTd3r7aW+M0o5CbUFtv+SKAAA',
      },
    },
    transactionTime: 1678937408698,
  };
  const wrapper = shallow(<NFTCollectionRegistrationTicket ticket={ticket} />);

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
