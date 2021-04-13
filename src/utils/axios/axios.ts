import Axios from 'axios';

import * as URLS from '../constants/urls';

const axios = Axios.create({
  baseURL: URLS.BASE_URL,
});

axios.interceptors.response.use(
  response => response,
  error => {
    console.error(error.toJSON());
  },
);

export default axios;
