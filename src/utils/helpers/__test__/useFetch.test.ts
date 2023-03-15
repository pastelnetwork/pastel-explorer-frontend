import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { DEFAULT_API_URL } from '../../constants/urls';
import { getBaseURL, axiosGet } from '../useFetch/useFetch';

describe('utils/helpers/useFetch', () => {
  test('getBaseURL should works correctly', () => {
    expect(getBaseURL()).toEqual(DEFAULT_API_URL);
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        cluster: {
          url: 'https://explorer.pastel.network',
        },
      }),
    );
    JSON.parse = jest.fn().mockImplementation(() => {
      return {
        url: 'https://explorer.pastel.network',
      };
    });
    expect(getBaseURL()).toEqual('https://explorer.pastel.network');
  });

  test('axiosGet should works correctly', done => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    JSON.parse = jest.fn().mockImplementation(() => {
      return data;
    });
    mock.onGet(window.location.href).reply(200, data);
    axiosGet(window.location.href).then(res => {
      expect(res).toEqual(data);
      done();
    });
  });
});
