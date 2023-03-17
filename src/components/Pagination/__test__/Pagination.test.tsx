import { shallow } from 'enzyme';

import 'jest-styled-components';

import Pagination from '../Pagination';

describe('components/Pagination', () => {
  const wrapper = shallow(<Pagination totalPage={5} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
