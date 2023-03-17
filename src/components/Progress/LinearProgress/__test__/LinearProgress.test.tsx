import { shallow } from 'enzyme';

import 'jest-styled-components';

import LinearProgress from '../LinearProgress';

describe('components/Progress/LinearProgress', () => {
  const wrapper = shallow(<LinearProgress value={50} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
