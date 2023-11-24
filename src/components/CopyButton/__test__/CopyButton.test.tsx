import { shallow } from 'enzyme';
import { Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import CopyButton from '../CopyButton';
import * as Styles from '../CopyButton.styles';

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

describe('components/CopyButton', () => {
  const wrapper = shallow(
    <CopyButton copyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Tooltip>', () => {
    expect(wrapper.find(Tooltip).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <FileCopyIcon>', () => {
    expect(wrapper.find(FileCopyIcon).length).toBeGreaterThanOrEqual(1);
  });

  test('should render <Styles.IconButton>', () => {
    expect(wrapper.find(Styles.IconButton).length).toBeGreaterThanOrEqual(1);
  });
});
