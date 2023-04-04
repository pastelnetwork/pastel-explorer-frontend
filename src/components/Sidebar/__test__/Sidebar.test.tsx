import { shallow } from 'enzyme';

import 'jest-styled-components';

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
});

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
  const wrapper = shallow(<Sidebar routes={routes} />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
