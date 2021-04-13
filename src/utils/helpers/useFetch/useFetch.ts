import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import axios from '@utils/axios/axios';
import { setResponseError } from '@redux/actions/responseErrorsActions';

interface IUseFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  url: string;
}

export const useFetch = <FetchedData>({ method, url }: IUseFetchOptions) => {
  const dispatch = useDispatch();

  const fetchData = async (): Promise<FetchedData | undefined> =>
    axios[method](url)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        console.error(error);

        dispatch(setResponseError(true));

        return undefined;
      });

  return { fetchData };
};
