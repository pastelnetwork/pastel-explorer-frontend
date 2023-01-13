import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TMempoolInfo } from '@utils/types/IStatistics';

export default function useMempoolSize(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TMempoolInfo> }>(
    () => `${URLS.GET_STATISTICS_MEMPOOL_INFO}?period=${period}&sortDirection=DESC`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
