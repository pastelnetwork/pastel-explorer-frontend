import { shallow } from 'enzyme';
import { Typography, Grid } from '@material-ui/core';
import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import ErrorHandler from '../ErrorHandler';
import * as Styles from '../ErrorHandler.styles';

jest.mock('i18next-http-backend');
i18next.t = jest.fn().mockImplementation((...arg) => {
  return arg[0];
});

describe('pages/ErrorHandler', () => {
  const wrapper = shallow(
    <ErrorHandler>
      <div>Content</div>
    </ErrorHandler>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Grid>', () => {
    expect(wrapper.find(Grid).length).toBe(0);
  });

  test('should render <Typography>', () => {
    expect(wrapper.find(Typography).length).toBe(0);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBe(0);
  });

  test('should render <Styles.ContentWrapper>', () => {
    expect(wrapper.find(Styles.ContentWrapper).length).toBe(0);
  });

  test('should render <Styles.Button>', () => {
    expect(wrapper.find(Styles.Button).length).toBe(0);
  });
});
