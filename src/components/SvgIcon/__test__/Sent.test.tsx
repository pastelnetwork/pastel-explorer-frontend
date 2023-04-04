import { shallow } from 'enzyme';

import Sent from '../Sent';

describe('components/SvgIcon/Sent', () => {
  const wrapper = shallow(<Sent />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBe(9);
  });
});
