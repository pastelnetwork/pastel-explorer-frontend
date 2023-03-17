import { shallow } from 'enzyme';

import DiscordIcon from '../DiscordIcon';

describe('components/SvgIcon/DiscordIcon', () => {
  const wrapper = shallow(<DiscordIcon />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <svg>', () => {
    expect(wrapper.find('svg').length).toBeGreaterThanOrEqual(1);
  });

  test('should render <path>', () => {
    expect(wrapper.find('path').length).toBeGreaterThanOrEqual(1);
  });
});
