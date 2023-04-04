import { shallow } from 'enzyme';

import Balance, { BurnBalance } from '../Balance';

describe('components/SvgIcon/Balance', () => {
  const wrapper = shallow(<Balance />);

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

describe('components/SvgIcon/BurnBalance', () => {
  const wrapper = shallow(<BurnBalance />);

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
