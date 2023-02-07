import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TNettotalsInfo } from '@utils/types/IStatistics';

export default function useNettotals(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TNettotalsInfo> }>(
    () => `${URLS.GET_STATISTICS_NETTOTALS}?period=${period}&sortDirection=ASC`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
