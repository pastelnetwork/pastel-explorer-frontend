import Axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { setResponseError } from '@redux/actions/responseErrorsActions';

import * as URLS from '@utils/constants/urls';

interface IUseFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  url: string;
}

interface IFetchDataOptions {
  params?: { [key: string]: string | number };
}

const axios = Axios.create({
  baseURL: URLS.BASE_URL,
});

export const useFetch = <FetchedData>({ method, url }: IUseFetchOptions) => {
  const { CancelToken } = Axios;
  let cancel;
  const dispatch = useDispatch();

  const fetchData = async (options: IFetchDataOptions = {}): Promise<FetchedData | undefined> =>
    axios[method](url, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        // eslint-disable-next-line
        cancel = c;
      }),
      ...options,
    })
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        console.error(error);

        dispatch(setResponseError(true));

        return undefined;
      });

  return { fetchData };
};
