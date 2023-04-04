import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import 'jest-styled-components';

import Hourglass from '../Hourglass';

const mockStore = configureMockStore();
const store = mockStore({});

describe('components/Hourglass', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Hourglass />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
