import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { INetwork } from '@utils/types/INetwork';

export default function useSupernodes(limit: number, offset: number) {
  const { data, error, isLoading } = useSWR<INetwork>(
    `${URLS.NETWORK_URL}?limit=${limit}&offset=${offset}`,
    axiosGet,
  );

  return {
    masternodes: data?.masternodes,
    isError: error,
    isLoading,
  };
}
