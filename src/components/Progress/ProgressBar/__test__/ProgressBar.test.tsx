import { shallow } from 'enzyme';

import 'jest-styled-components';

import ProgressBar from '../ProgressBar';
import * as Styles from '../ProgressBar.styles';

describe('components/Progress/ProgressBar', () => {
  const wrapper = shallow(<ProgressBar total={95} value={50} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Styles.ProgressBarWrapper>', () => {
    expect(wrapper.find(Styles.ProgressBarWrapper).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.ProgressBarValue>', () => {
    expect(wrapper.find(Styles.ProgressBarValue).length).toBeGreaterThanOrEqual(1);
  });
});
