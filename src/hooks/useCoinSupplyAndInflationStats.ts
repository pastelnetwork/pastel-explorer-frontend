import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TCoinSupplyAndInflationStats } from '@utils/types/IStatistics';

export default function useCoinSupplyAndInflationStats(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TCoinSupplyAndInflationStats> }>(
    () => `${URLS.GET_STATISTICS_COIN_SUPPLY_AND_CIRCULATING_SUPPLY}?period=${period}`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
