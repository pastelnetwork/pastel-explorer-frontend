import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TChartResponseItem } from '@utils/types/IStatistics';

export default function useTotalTransactionsPerDay(period: string, groupBy: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TChartResponseItem> }>(
    () =>
      `${URLS.GET_TRANSACTIONS_CHARTS}?period=${period}&sortDirection=DESC&func=COUNT&col=id&groupBy=${groupBy}&startValue=false`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
