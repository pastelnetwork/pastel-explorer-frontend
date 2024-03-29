import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import Sidebar from '../Sidebar';

jest.mock('i18next-http-backend');
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            // noop
          }),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {
      // noop
    },
  },
}));

i18next.t = jest.fn().mockImplementation((...arg) => {
  return arg[0];
}) as MyMockType;

function MyComponent() {
  return <div>My component</div>;
}

describe('components/Sidebar', () => {
  const routes = [
    {
      id: 'my',
      path: '/my-page',
      children: null,
      component: MyComponent,
    },
  ];
  const wrapper = shallow(
    <Router>
      <Sidebar routes={routes} />
    </Router>,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
