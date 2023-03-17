import { shallow } from 'enzyme';

import 'jest-styled-components';

import i18next from '../../../utils/helpers/i18n';
import ErrorHandler from '../ErrorHandler';

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
});
