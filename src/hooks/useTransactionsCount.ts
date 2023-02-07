import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TTransactionsChart } from '@utils/types/IStatistics';

export default function useTransactionsCount(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TTransactionsChart> }>(
    () =>
      `${URLS.GET_TRANSACTIONS_CHARTS}?period=${period}&sortDirection=DESC&func=COUNT&col=id&startValue=false`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
