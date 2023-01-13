import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TTransactionPerSecond } from '@utils/types/IStatistics';

export default function useTransactionPerSecond(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TTransactionPerSecond> }>(
    () => `${URLS.GET_STATISTICS_TRANSACTION_PER_SECOND}?period=${period}&sortDirection=DESC`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
