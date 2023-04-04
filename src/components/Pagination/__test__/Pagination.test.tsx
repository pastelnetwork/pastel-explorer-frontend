import { shallow } from 'enzyme';
import ReactPaginate from 'react-paginate';

import 'jest-styled-components';

import * as Styles from '../Pagination.styles';
import Pagination from '../Pagination';

describe('components/Pagination', () => {
  const wrapper = shallow(<Pagination totalPage={5} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <ReactPaginate>', () => {
    expect(wrapper.find(ReactPaginate).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBeGreaterThanOrEqual(1);
  });
});
