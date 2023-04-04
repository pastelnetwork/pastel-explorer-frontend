import { shallow } from 'enzyme';

import TelegramIcon from '../TelegramIcon';

describe('components/SvgIcon/TelegramIcon', () => {
  const wrapper = shallow(<TelegramIcon />);

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
