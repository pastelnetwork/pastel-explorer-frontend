import { shallow } from 'enzyme';

import Fire from '../Fire';

describe('components/SvgIcon/Fire', () => {
  const wrapper = shallow(<Fire />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBe(273);
  });
});
