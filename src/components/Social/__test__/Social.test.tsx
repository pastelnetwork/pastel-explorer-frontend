import { shallow } from 'enzyme';

import 'jest-styled-components';

import Social from '../Social';
import * as Styles from '../Social.styles';

describe('components/Social', () => {
  const wrapper = shallow(<Social />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Styles.Items>', () => {
    expect(wrapper.find(Styles.Items).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.Item>', () => {
    expect(wrapper.find(Styles.Item).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.IconButtonLink>', () => {
    expect(wrapper.find(Styles.IconButtonLink).length).toBeGreaterThanOrEqual(1);
  });
});
