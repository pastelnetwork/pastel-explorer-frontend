import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { THashrate } from '@utils/types/IStatistics';

export default function useHashRate(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<THashrate> }>(
    () => `${URLS.GET_STATISTICS_MINING_CHARTS}?period=${period}`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
