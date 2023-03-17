import { shallow } from 'enzyme';
import { Grid } from '@material-ui/core';
import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import Tickets from '../Tickets';
import Sense from '../Sense';
import Cascade from '../Cascade';
import PastelNFT from '../PastelNFT';
import Other from '../Other';
import * as Styles from '../Tickets.styles';

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

describe('pages/Tickets', () => {
  const wrapper = shallow(<Tickets />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Sense>', () => {
    expect(wrapper.find(Sense).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Cascade>', () => {
    expect(wrapper.find(Cascade).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <PastelNFT>', () => {
    expect(wrapper.find(PastelNFT).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Other>', () => {
    expect(wrapper.find(Other).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.TicketsContainer>', () => {
    expect(wrapper.find(Styles.TicketsContainer).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.GirdStyle>', () => {
    expect(wrapper.find(Styles.GirdStyle).length).toBeGreaterThanOrEqual(1);
  });
});
