import { shallow } from 'enzyme';

import 'jest-styled-components';

import RouterLink from '../RouterLink';

describe('components/RouterLink', () => {
  const wrapper = shallow(<RouterLink route="/path" value="Click here" />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
