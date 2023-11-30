import { shallow } from 'enzyme';
import { Typography, Grid } from '@mui/material';
import ReactECharts from 'echarts-for-react';

import 'jest-styled-components';

// import i18next from '../../../../utils/helpers/i18n';
import DoughnutChart from '../DoughnutChart';
import * as Styles from '../DoughnutChart.styles';

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
jest.mock('i18next', () => ({
  t: (str: string) => str,
}));
// i18next.t = jest.fn().mockImplementation((...arg) => {
//   return arg[0];
// });

describe('components/Charts/DoughnutChart', () => {
  const data = {
    labels: ['United States'],
    datasets: [
      {
        data: [27],
        backgroundColor: [
          '#279989',
          '#41B6E6',
          '#a5d6a7',
          '#ef9a9a',
          '#ffcc80',
          '#2e7d32',
          '#c62828',
          '#ef6c00',
        ],
        borderWidth: 1,
        borderColor: '#FFF',
        barThickness: 40,
      },
    ],
  };
  const wrapper = shallow(
    <DoughnutChart
      data={data}
      title="Supernode Statistics"
      innerTitle="Total"
      totalSuperNodes={27}
    />,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <ReactECharts>', () => {
    expect(wrapper.find(ReactECharts).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <MuiAlert>', () => {
    expect(wrapper.find(Typography).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ChartWrapper>', () => {
    expect(wrapper.find(Styles.ChartWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.DoughnutInner>', () => {
    expect(wrapper.find(Styles.DoughnutInner).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.StakingWrapper>', () => {
    expect(wrapper.find(Styles.StakingWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.StakingTitle>', () => {
    expect(wrapper.find(Styles.StakingTitle).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.CardContent>', () => {
    expect(wrapper.find(Styles.CardContent).length).toBeGreaterThanOrEqual(1);
  });
});
