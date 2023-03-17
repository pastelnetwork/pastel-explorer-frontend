import { shallow } from 'enzyme';

import 'jest-styled-components';

import Social from '../Social';

describe('components/Social', () => {
  const wrapper = shallow(<Social />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
