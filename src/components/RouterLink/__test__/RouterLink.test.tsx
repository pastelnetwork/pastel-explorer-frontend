import { shallow } from 'enzyme';
import Tooltip from '@mui/material/Tooltip';
import 'jest-styled-components';

import RouterLink, { ExternalLink } from '../RouterLink';
import * as Styles from '../RouterLink.styles';

describe('components/RouterLink', () => {
  const wrapper = shallow(<RouterLink route="/path" value="Click here" />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Styles.RouterLink>', () => {
    expect(wrapper.find(Styles.RouterLink).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Tooltip>', () => {
    const wrapperWithTooltip = shallow(
      <RouterLink route="/path" value="Click here" isUseTooltip title="Title content" />,
    );
    expect(wrapperWithTooltip.find(Tooltip).length).toBeGreaterThanOrEqual(1);
    expect(wrapperWithTooltip.find(Styles.RouterLink).length).toBeGreaterThanOrEqual(1);
  });

  test('should render ExternalLink', () => {
    const wrapperWithTooltip = shallow(<ExternalLink href="/path" value="Click here" />);
    expect(wrapperWithTooltip.find(Styles.ExternalLink).length).toBeGreaterThanOrEqual(1);
  });

  test('should render ExternalLink with Tooltip', () => {
    const wrapperWithTooltip = shallow(
      <ExternalLink href="/path" value="Click here" isUseTooltip title="Title content" />,
    );
    expect(wrapperWithTooltip.find(Tooltip).length).toBeGreaterThanOrEqual(1);
    expect(wrapperWithTooltip.find(Styles.ExternalLink).length).toBeGreaterThanOrEqual(1);
  });
});
