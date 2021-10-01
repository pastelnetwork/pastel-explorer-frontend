import { useCallback, useEffect, useRef, useState } from 'react';

import Axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '@utils/constants/urls';

import { setResponseError } from '@redux/actions/responseErrorsActions';

interface IUseFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  url: string;
}

interface IFetchDataOptions {
  params?: { [key: string]: string | number };
}

export const getBaseURL = () => {
  try {
    const persist = localStorage.getItem('persist:root');
    if (persist) {
      const store = JSON.parse(persist);
      const tmp = JSON.parse(store.cluster);
      return tmp.url;
    }
    return BASE_URL;
  } catch {
    return BASE_URL;
  }
};

export const axiosInstance = Axios.create({
  baseURL: getBaseURL(),
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response =>
    // Do something with response data
    response,
  error => {
    if (error?.response?.data?.error) {
      return Promise.reject(new Error(error.response.data.error));
    }

    return Promise.reject(error.message);
  },
);

export const useFetch = <FetchedData, Transform = FetchedData>(
  { method, url }: IUseFetchOptions,
  callback?: (_data: FetchedData) => Transform,
) => {
  const dispatch = useDispatch();

  const fetchData = async (
    options: IFetchDataOptions = {},
  ): Promise<FetchedData | Transform | undefined> =>
    axiosInstance[method](url, options)
      .then(({ data }) => {
        if (callback) {
          return callback(data);
        }
        return data;
      })
      .catch((error: AxiosError) => {
        console.error(error);
        dispatch(setResponseError(true, error.message));

        return undefined;
      });

  return { fetchData };
};

export type IDeferredDataState<T> = { isLoading: boolean; data: T };

export function useDeferredData<FetchedData, Transform = FetchedData>(
  { method, url, params }: IUseFetchOptions & IFetchDataOptions,
  callback?: (_data: FetchedData) => Transform,
  initialData?: Transform,
  defaultData?: Transform,
  deps: any[] = [], // eslint-disable-line
): IDeferredDataState<Transform | undefined> {
  const [state, setState] = useState(() => ({
    isLoading: initialData === undefined,
    data: initialData || defaultData,
  }));
  const skipNextRef = useRef(initialData !== undefined);
  const dispatch = useDispatch();

  const memoizedSource = useCallback(async (): Promise<Transform> => {
    return axiosInstance[method](url, { params })
      .then(({ data }) => {
        if (callback) {
          return callback(data);
        }
        return data;
      })
      .catch((error: AxiosError) => {
        console.error(error);
        dispatch(setResponseError(true, error.message));
        return undefined;
      });
  }, deps);

  useEffect(() => {
    if (skipNextRef.current) {
      skipNextRef.current = false;
      // eslint-disable-next-line
      return () => {};
    }

    let canceled = false;

    setState(curState => {
      if (!curState.isLoading) {
        return { ...curState, isLoading: true };
      }

      return curState;
    });

    memoizedSource().then(data => {
      if (canceled) {
        return;
      }

      setState(() => ({ isLoading: false, data }));
    });

    return () => {
      canceled = true;
    };
  }, [memoizedSource]);

  return state;
}
