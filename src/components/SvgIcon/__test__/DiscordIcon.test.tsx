import { shallow } from 'enzyme';

import DiscordIcon from '../DiscordIcon';

describe('components/SvgIcon/DiscordIcon', () => {
  const wrapper = shallow(<DiscordIcon />);

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
