import Axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { setResponseError } from '@redux/actions/responseErrorsActions';

import * as URLS from '@utils/constants/urls';

interface IUseFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  url: string;
  isSilentError?: boolean;
}

interface IFetchDataOptions {
  params?: { [key: string]: string | number };
}

const axios = Axios.create({
  baseURL: URLS.BASE_URL,
});

export const useFetch = <FetchedData>({ method, url, isSilentError }: IUseFetchOptions) => {
  const dispatch = useDispatch();

  const fetchData = async (options: IFetchDataOptions = {}): Promise<FetchedData | undefined> =>
    axios[method](url, options)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        console.error(error);

        if (!isSilentError) {
          dispatch(setResponseError(true));
        }

        return undefined;
      });

  return { fetchData };
};
