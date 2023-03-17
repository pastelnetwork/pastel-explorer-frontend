import { shallow } from 'enzyme';

import TwitterIcon from '../TwitterIcon';

describe('components/SvgIcon/TwitterIcon', () => {
  const wrapper = shallow(<TwitterIcon />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBeGreaterThanOrEqual(1);
  });

  test('should render <g>', () => {
    expect(wrapper.find('g').length).toBeGreaterThanOrEqual(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBeGreaterThanOrEqual(1);
  });
});
