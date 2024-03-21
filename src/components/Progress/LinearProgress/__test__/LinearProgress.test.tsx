import { shallow } from 'enzyme';

import { Grid } from '@mui/material';
import 'jest-styled-components';

import LinearProgress from '../LinearProgress';
import * as Styles from '../LinearProgress.styles';

describe('components/Progress/LinearProgress', () => {
  const wrapper = shallow(<LinearProgress value={50} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.LinearProgress>', () => {
    expect(wrapper.find(Styles.LinearProgress).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Typography>', () => {
    expect(wrapper.find(Styles.Typography).length).toBe(0);
  });
});
