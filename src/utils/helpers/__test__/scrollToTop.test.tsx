import React from 'react';
import { shallow } from 'enzyme';

import ScrollToTop from '../scrollToTop/scrollToTop';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: 'https://explorer-testnet.pastel.network/movement',
  }),
}));

describe('utils/helpers/scrollToTop/scrollToTop', () => {
  test('scrollToTop should works correctly', () => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    window.scrollTo = jest.fn();
    const windowSpy = jest.spyOn(window, 'scrollTo');
    shallow(<ScrollToTop />);
    expect(windowSpy).toBeCalledTimes(1);
  });
});
