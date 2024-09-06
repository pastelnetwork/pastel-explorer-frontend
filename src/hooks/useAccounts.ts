import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IStatistic } from '@utils/types/IStatistics';

export default function useAccounts(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<IStatistic> }>(
    () =>
      `${URLS.GET_STATISTICS_ACCOUNTS}?period=${period}&sortDirection=ASC&fields=nonZeroAddressesCount,timestamp,zeroAddressesCount`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
