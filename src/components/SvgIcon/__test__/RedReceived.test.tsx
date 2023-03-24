import { shallow } from 'enzyme';

import Received, { RedReceived } from '../Received';

describe('components/SvgIcon/Received', () => {
  const wrapper = shallow(<Received />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });

  test('should render <rect>', () => {
    expect(wrapper.find('rect').length).toBe(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBe(9);
  });
});

describe('components/SvgIcon/Received/RedReceived', () => {
  const wrapper = shallow(<RedReceived />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });

  test('should render <rect>', () => {
    expect(wrapper.find('rect').length).toBe(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBe(9);
  });
});
