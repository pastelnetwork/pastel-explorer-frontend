import Axios from 'axios';

import * as URLS from '../constants/urls';

const axios = Axios.create({
  baseURL: URLS.BASE_URL,
});

export default axios;
