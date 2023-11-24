import { createElement } from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import ReduxProvider from '../../../__mock__/ReduxProvider';
import Blocks from '../Blocks';
import * as Styles from '../Blocks.styles';

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

const initialMockStore = {
  dateRange: null,
  dropdownType: [],
  customDateRange: {
    startDate: 0,
    endDate: null,
  },
};
const mockStore = configureMockStore();
const store = mockStore(initialMockStore);
jest.spyOn(redux, 'useSelector').mockReturnValue(initialMockStore);

describe('pages/Blocks', () => {
  const wrapper = mount(
    createElement(() => (
      <ReduxProvider store={store}>
        <Blocks />
      </ReduxProvider>
    )),
  );

  test('renders correctly', () => {
    const page = shallow(
      <Provider store={store}>
        <Blocks />
      </Provider>,
    );
    expect(page).toMatchSnapshot();
  });

  test('should render table', () => {
    expect(wrapper.html().search('ReactVirtualized__Table').valueOf()).not.toEqual(-1);
  });

  test('should render dropdown', () => {
    expect(wrapper.html().search('MuiSelect-select').valueOf()).not.toEqual(-1);
  });

  test('should render title', () => {
    expect(wrapper.html().search(Styles.Title).valueOf()).not.toEqual(-1);
  });
});
