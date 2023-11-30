import { shallow } from 'enzyme';
import MuiAlert from '@mui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';
import 'jest-styled-components';

import Alert from '../Alert';
import * as Styles from '../Alert.styles';

describe('components/Alert', () => {
  const wrapper = shallow(
    <Alert
      isOpen
      title="Lorem ipsum dolor sit amet"
      message="Ut eu dignissim lacus, a volutpat mauris."
    />,
  );
  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Snackbar>', () => {
    expect(wrapper.find(Snackbar).length).toEqual(1);
  });

  test('should render <MuiAlert>', () => {
    expect(wrapper.find(MuiAlert).length).toEqual(1);
  });

  test('should render <Styles.Title>', () => {
    expect(wrapper.find(Styles.Title).length).toEqual(1);
  });
});
