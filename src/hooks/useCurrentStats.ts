import useSWR from 'swr';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';

interface ICurrentStats {
  coinSupply: number;
  usdPrice: number;
}

export default function useCurrentStats() {
  const { data, isLoading } = useSWR<ICurrentStats>(`${URLS.CURRENT_STATS}`, axiosGet, SWR_OPTIONS);
  return {
    currentStats: data,
    isCurrentStatsLoading: isLoading,
  };
}
