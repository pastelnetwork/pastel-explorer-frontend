import { shallow } from 'enzyme';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import 'jest-styled-components';

import Alert from '../Alert';
import * as Styles from '../Alert.styles';

describe('components/Alert', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <Alert
        isOpen
        title="Lorem ipsum dolor sit amet"
        message="Ut eu dignissim lacus, a volutpat mauris."
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(MuiAlert).length).toEqual(1);
    expect(wrapper.find(Snackbar).length).toEqual(1);
    expect(wrapper.find(Styles.Title).length).toEqual(1);
  });
});
