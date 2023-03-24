import { shallow } from 'enzyme';

import TwitterIcon from '../TwitterIcon';

describe('components/SvgIcon/TwitterIcon', () => {
  const wrapper = shallow(<TwitterIcon />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });

  test('should render <g>', () => {
    expect(wrapper.find('g').length).toBe(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBe(1);
  });
});
