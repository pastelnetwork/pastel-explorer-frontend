import { shallow } from 'enzyme';

import Medium from '../Medium';

describe('components/SvgIcon/Medium', () => {
  const wrapper = shallow(<Medium />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBe(1);
  });
});
