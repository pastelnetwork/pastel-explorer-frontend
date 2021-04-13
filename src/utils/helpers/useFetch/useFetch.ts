import { useDispatch } from 'react-redux';
import axios from '@utils/axios/axios';
import { AxiosError } from 'axios';

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
        // Print error in console for more details
        console.error(error);

        // Dispatch action to show alert component in UI on API call error
        dispatch(setResponseError(true));

        return undefined;
      });

  return { fetchData };
};
