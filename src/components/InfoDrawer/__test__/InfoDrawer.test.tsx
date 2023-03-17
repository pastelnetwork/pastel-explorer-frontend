import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import 'jest-styled-components';

import InfoDrawer from '../InfoDrawer';

const mockStore = configureMockStore();
const store = mockStore({});

describe('components/InfoDrawer', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <InfoDrawer />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
