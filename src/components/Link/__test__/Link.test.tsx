import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import { themeLight } from '../../../theme';
import { Link } from '../Link.styles';

describe('components/Link', () => {
  const wrapper = shallow(
    <ThemeProvider theme={themeLight}>
      <Link to="domain.com" />
    </ThemeProvider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
