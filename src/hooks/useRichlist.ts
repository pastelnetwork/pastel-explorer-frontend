import useSWR from 'swr';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IRichlist } from '@utils/types/IRichlists';

export default function useRichlist() {
  const { data, isLoading } = useSWR<{ data: Array<IRichlist> }>(
    URLS.RICHLIST_URL,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.data,
    isLoading,
  };
}

export function useCoinSupply() {
  const { data, isLoading } = useSWR<number>(URLS.GET_COIN_SUPPLY, axiosGet, SWR_OPTIONS);
  return {
    coinSupply: data || 0,
    isLoading,
  };
}
