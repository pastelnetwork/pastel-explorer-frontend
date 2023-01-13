import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TTransactionsChart } from '@utils/types/IStatistics';

export default function useTotalTransactionFees(period: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: Array<TTransactionsChart>;
    startValue: number;
    endValue: number;
  }>(
    () => `${URLS.GET_TRANSACTIONS_CHARTS}?period=${period}&sortDirection=DESC&func=SUM&col=fee`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    startValue: data ? data[0].startValue : 0,
    endValue: data ? data[0].endValue : 0,
    isLoading,
  };
}
