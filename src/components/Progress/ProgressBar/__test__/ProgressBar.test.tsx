import { shallow } from 'enzyme';

import 'jest-styled-components';

import ProgressBar from '../ProgressBar';

describe('components/Progress/ProgressBar', () => {
  const wrapper = shallow(<ProgressBar total={95} value={50} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
