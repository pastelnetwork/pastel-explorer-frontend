import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import RouterLink from '../../RouterLink/RouterLink';
import i18next from '../../../utils/helpers/i18n';
import ActionRegistrationTicket from '../ActionRegistrationTicket';
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

describe('components/ActionRegistrationTicket', () => {
  const ticket = {
    action_ticket:
      'eyJhY3Rpb25fdGlja2V0X3ZlcnNpb24iOjEsImNhbGxlciI6ImpYWGthY3dQd29WRHJzZ3N4a25ocUdmNk4yRzlhOUhzY1ZDekxoQnhmRDNzRUpzR0U3TFZmTFF1dUdHOHo0d3FVdmt1Sjd6V2dCSE1XQmJHUGo3S2VjIiwiYmxvY2tudW0iOjI0NTgyMywiYmxvY2tfaGFzaCI6IjAwMDAwMDZlMGYwOTEzMDdkOWNhMjFlNzkwMGI5MWViMTAzYmEzN2VjNzVmMGExYzgzZjM0MGU5MDhiNjQ4ZDgiLCJhY3Rpb25fdHlwZSI6ImNhc2NhZGUiLCJhcGlfdGlja2V0IjoiZXlKa1lYUmhYMmhoYzJnaU9pSnhTV3htY0dkTVJFRmlUbEF3VVVwTFZ6QXZPVzh3UVVvelZHczRRblZwUTBsUlYzQkljekpuWlRodlBTSXNJbVpwYkdWZmJtRnRaU0k2SWpVeU1UZzJNamt1YW5Cbklpd2ljbkZmYVdNaU9qUXhNREUwTlRrME16WXNJbkp4WDIxaGVDSTZOVEFzSW5KeFgybGtjeUk2V3lKSVRrZEtWbFJ6V1V4RmREaDVaVEY1TlcxSFZrZERibEpqTnpRM1JWcGFWVmhpVG0xYWFYVnBjV0kyUVNJc0lrUmFaMHA1Y2tjMGFqUndjbkpZUkhwclMyazVabUphYUdaMldqVnlVRzVwUWtONE5IRmxNVzQ1VlhSbUlpd2lTR05IZFd0R2VUVjVVR2d6VTNwM2JWSlNjM1EwWW1SaWNrSnVhMDVRTlhCd2FXNXVWMjFRY21rMVpsY2lMQ0pEVjNsUWNYRkZPV3QyUVZaVWFYUnpkRWhoVFhGak9GSlRVVmhvWWxBNFIxcEdUVlowTTFRMGVrMUZaaUlzSWtoYVpXcE5SM2t6VVdWTVkzaHBhRkp6T0ZRMWFVcFFaRmwzTmpOcldsaEZUVVZSZGpsU2FWWkRjVGhySWl3aU5sUk9aME5ZYUhKd2IxWmtXWFpPV2xkWVRWZG5RMUJFVTBGdk1YbHRjbFprTlZGTWVrcEhjbHB6VVhBaUxDSTBTek5sYW5wM1RXbEhVa1V5TW5CMmJYQk1aVTVtV0dodVMxVmlOMUkwV2tSeldFaE1SM04wZUhoSVF5SXNJbUV6YXpaWFZISnhWelJMUkZKRFlWSkVOak5RUTI5MlJVaGxjRkIyTW5ONlpuUnVhVkJ0ZVZZMmNIZ2lMQ0kxUVZRNVRIVk9NV0ZXZWs1dFptNUdjMmhvYlhWMFMyNTBSMmhSTkZscGFuUlZhM2RtYVdWaVdEUlpNaUlzSWpkd1VrMXVkekpPV1RneWJ6aGFZMWQwVG1aV1VXZDBiVGhVWnpsWmNtWm1SVEZVV2tjeVUySk9kV2ROSWl3aVJqaE1WMFZoVjNScmJXRTBkVzkxWTNsQ2NsQkRVbEpXZERRNFZVYzVjMEpRUlZNM1VFNU9RVXM0VVRVaUxDSkJWek5DZEdzeGRtcGpaVFpJYUVoWk5rVktjMGhrVkVwSGRuVkZRbXBqVjFRMlRUUlpjelJqY2tZeVF5SXNJalp1YVZobmFFTm1RbEJ5V0ROVFdUUnZORmh4YVdZNWEyaDBlamR2YldsTVpIWnlXWEl6TTNSMFJEUm1JaXdpTXpSdWIwRjNibEJ2WlZOQ04xTnpUR2Q1Wm01WGFWQjZXREZsVjNCSGNqSjJXR2RNZEhCeFZHZGpkVGdpTENJemVVdDJWRVpWUnpaNFdGZHVWa0ZtZG1Sdk4zSnFVRWRoVUdscE9UWjZlV1EzZEdjeVYxTlhkMDF3VWlJc0lqUlFTMlJvVlUxek16RlRkRGRJV0ZsMGVIQnZNbkZSWVVaNWIzZFpVekl5Y0RWT1RXZDNOVXRMVkdsYUlpd2lNelZuWkU1RVNrMDFiM2xZTlhOVk0xaHFVRmhVZGpjeFREaFNZVkpUWmpSdmFFdDNabUpPYmtSNVNIVWlMQ0pCVkdwR1FUSlFabmQwVWpGU1ptUnVZbUZrZERKVmRVMTRhM0JZUkhJMmVHVkRaV1JtYzBwbGQxbFJkeUlzSWpWeWNFcGtRMlpxVTBSQmN6VnFNVXQwZW5oUVoydElhMVJrTWpJMWFEbEJOV001V2tGaVNHTjVjalpDSWl3aU9XRTNiek5rWjJacmRYTTVaMU4wTWxKalltcHRWa1p6UjBWcVRVMVFZMHN5TTJoVlVEVjZORlI1VjI4aUxDSTRkR2hFTVcxUVVVcENOSGRWZGsxV1JVaG5PRXRqZEdKWlN6RjVkamw2Y1UxTGR6RkNXakZPUjFjMGRpSXNJa0YyYVZWNk1uUlhiMVpHTkc1UlRHNW5TMWh3TVVocmVXUkhRMnRtVmtKWmJUSnBkVmxUUjBKS05XZG9JaXdpUWtWS05tWlpPVzl6UmxsemIxaEljVkZZVWtWb1NIbEZTMDFWVUdZNGRuazVka1ZyY25ZMVNGUlVOR2dpTENKRE0zZEZVa2huUmxWbGJsZG1PVmQ0Y25sMFVHOXlUbmxIVTFSQlNFczNTRXB2Y1RaV1VVVmFkWHA0TnlJc0lqWktlREZXV1hGek0wUnhka1pCTVdoU1FXOUVWVXBWUmtkVmVuTndVbEJsUlhOR1owTmthV3R0VFhkdElpd2lTSGx0ZWpaTlVYVnlaak5SYTNaU1VrVlpZVGxhZDB0cFltbHFZMVpOYUZaUWExWmxNemQzZW1VemIzUWlMQ0pHWkVVeldtcGlWMW96Y0VNeFdXMUlSV2hMUjJvMWNIQkVWR0pZY0V0cWFsbEJWMVIyV2tReFJuSmFWU0lzSWtKb1RUaHBlbnBZYlZaVlUxRTBjM0ZuUVd0UlVVMUZhVkJ5UlVKcmFUTnhZek55Tm1SMFkxWlFWbHBuSWl3aU1rUk1ja2hFTWxCSFoydGxSRU5MU0djNU1qUnFRVU40UVhCUlUxQlZPRUkyVTJoQmFFaGxaWEpsZVhvaUxDSTJiMDFpVkZGU2FWcHZXa3BSYTJkU2FuTlpWVWRGZUc5emNFZHdiMFJaTlV4WmNUSlJkRUZoZVhCR2RpSXNJa1ptUjFCVVVGRjZORU16TkcwM05tbGlNM1JhT1dsTlVGcEhZV3BaZGtGcU1VaHlhVWgwWjNCNVMxQkZJaXdpT0VSRVUycEdlR1UzYWpaRFRYTndNbU5OVmxwNlMzVnpXWGszVUZOS2RFNTJjekZPWVdSa1oxVTJWMVFpTENJelkwVlFVa3R2YmtoNk4wVktjMFZvT0Zaa1JGbDVkSFY2WlhkUVlsSkJTMXByZDJSeFlWWnFRa3RLY1NJc0lrSk9TSEZaZDAxVFNrWlhRa1pZWVc4NFIzaHdkbXBHWVRkM1kxZHhlbk5qUkVwS2MyZG9kR1F5T1dWeElpd2lTRmc0V21keU1WZHhhR0ZGWkVVNGVIbDNOR1JNV0dSRFdtMDVOV3R5VUZSWWFHUnBiVlJNUlhsdlIya2lMQ0pJWmt0cE9YZHllVlJvUjNacVVqSkJOamhoY0ZseFVqRjRlVEUzYm5NNFNHRnVZVVUzYVdKelJXdFFhaUlzSWtaVE5HZG9WVVp2UzFNNGJWVlNVMk4yU0VRemMwSkdaRkJpYURoVFJrWldWbnBvY1ZVMFJHSlljVVZaSWl3aU9GcERhMUJaUVdNek1sTlRaMlpYUkVkeFRuVTRWVEpoZERZeVltbDVVMWhYWW5GWFRERlRUbUl6Wm5naUxDSTRORXBtVm5waFpXVlRZalpVVkdkRVpqVlJjRlpSUmxkVWMzZElhR2h4T0hSd1UyRjVUa0kyV1VaRU15SXNJamRxUkdwb1oxRlFaV2h5U0VkaWMwb3ljbFZRY0dwaVFqTmpSMlZVV0RSblozZzJhVkJ2YTFVM1JWcGtJaXdpT0RSTlVqZG5SRlZvTldab1RVMURka05UTTFKb1JWWnRZVEYyV1cxRVdFVlRhMjlZYjBaa2IzZG5Xbk1pTENKRFRqWjJVbVJGWTNOclRFWTVUazFvU0U1eFlWRnBVblIyUmsxU2VUSjJjblp6TjFSNVpWRlRZbGhvVkNJc0lqSm9OVUZOVnpZNVl6RlJjVWM0VjBWT1RHOVNkVWRSVWtwYWIydGFkbGg1WkhoM2QxcFhXVTA1Y2t0aUlpd2lSMU0yZEZvME0ybFVZMmRoZG1kTGNqUjNaREpXVTNab1lreEhlV2h3ZUZocU1tNTRVRTFUVVROUVdHVWlMQ0l6T1V4eVEzbEVURFJHZFZkMU1XWmFOMkpvUTBaa1VXcHpPR2hNTmxSWE1rSnpkekZpY2xweFkzSTVNeUlzSWt0TE5XZDRiMWt6YVd0YVJtRmlkSHA1T0ZoWFRVeHJWV0pxVmtGbE5UUmhhWE5CYVZGaFZ6ZzRkeklpTENJMldYbERUVk0zV1dWeWRGUldXbVU0ZG1OM1lXdHpRVk5SYTFkTWRrcG1jMlZ6ZGpaVVVtcE9UVUpRTVNJc0lqazVVME5uZEV0dmFsRjFVRmhTVWpkUlYyazFkVlIzVlV4V1ExRnhhRVp2ZFV4NFZERmFiblZwUTJjMUlpd2lObGt6TmpSMmJtbEtaSE5uV2pKVlJVcHlRa05wYUhSb1lXcHRSVUk1VkZSWVdHbFdjV2RhYVUwMFIyUWlMQ0pEUjNSWWMwaFhhVVJWZFRGdWFHVkRlVUl4YVVKNGR6UkhibVU0ZDJkWU5FUk5aakUwUkc1MU9YTjFaQ0pkTENKeWNWOXZkR2tpT2lKQlFVRkZhM1ZaUVhjeFFVSkJRVVZKSWl3aWIzSnBaMmx1WVd4ZlptbHNaVjl6YVhwbFgybHVYMko1ZEdWeklqb3lPVGszTlRBc0ltWnBiR1ZmZEhsd1pTSTZJbWx0WVdkbEwycHdaV2NpTENKdFlXdGxYM0IxWW14cFkyeDVYMkZqWTJWemMybGliR1VpT21aaGJITmxmUSJ9',
    action_type: 'cascade',
    called_at: 245823,
    key: 'gzf7z7euiwdzbhgwtdlhhi6modfpyhybw25qyf4nqq4rddhhwr4a====',
    label: '2e9d36e7cf05927488c1162aa7e2d53152f2c4bfbfc330bb2fef29f19adf0648',
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
    storage_fee: 2515,
    type: 'action-reg',
    version: 1,
    activation_ticket: 'action-act',
    activation_txId: '06a81436580adebf5298df328e6bee9ecc6ab9a568d9084e0e7badb23b03a3c4',
    transactionTime: 1679015779000,
    height: 245824,
    activationTicket: {
      data: {
        ticket: {
          called_at: 245823,
          pastelID:
            'jXXkacwPwoVDrsgsxknhqGf6N2G9a9HscVCzLhBxfD3sEJsGE7LVfLQuuGG8z4wqUvkuJ7zWgBHMWBbGPj7Kec',
          reg_txid: '659de5be6f40a381b345a42a2b10144cb9a98b29031b85712d89e15fec1f1d5d',
          signature:
            '24a3ca156efa9794d10eec3257c647c692800a6ed44e56786aae340a96cf97caa9c2c64353a28c96332c078caa49f70055507f56ee4eb47e00a55cfab2c8d8acc07a1b4f28e9f9b5b8467814bb61570dd0123d2e9e9d531e0bd8fa2fd0058ee13e44916c379e3d76b5ce094e540642a40000',
          storage_fee: 2515,
          type: 'action-act',
          version: 1,
          transactionTime: 1679027981000,
          height: 245917,
        },
        id: '9b959350-a349-4342-9378-3430c6cbb5c4',
      },
      type: 'action-act',
      transactionHash: '06a81436580adebf5298df328e6bee9ecc6ab9a568d9084e0e7badb23b03a3c4',
      id: '9b959350-a349-4342-9378-3430c6cbb5c4',
    },
  };
  const wrapper = shallow(<ActionRegistrationTicket ticket={ticket} />);

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

  test('should render <Styles.Accordion>', () => {
    expect(wrapper.find(Styles.Accordion).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <AccordionSummary>', () => {
    expect(wrapper.find(AccordionSummary).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <AccordionDetails>', () => {
    expect(wrapper.find(AccordionDetails).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <ExpandMoreIcon>', () => {
    expect(wrapper.find(ExpandMoreIcon).length).toBeGreaterThanOrEqual(1);
  });
});
