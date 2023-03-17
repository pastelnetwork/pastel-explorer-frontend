import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import 'jest-styled-components';

import Navbar from '../Navbar';

const mockStore = configureMockStore();
const store = mockStore({});

function MyComponent() {
  return <div>My component</div>;
}

describe('components/Navbar', () => {
  const routes = [
    {
      id: 'my',
      path: '/my-page',
      children: null,
      component: MyComponent,
    },
  ];
  const wrapper = shallow(
    <Provider store={store}>
      <Navbar routes={routes} />
    </Provider>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
