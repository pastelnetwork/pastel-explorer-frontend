import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TAverageBlockSize } from '@utils/types/IStatistics';

export default function useAverageBlockSize(
  period: string,
  sortDirection: string,
  granularity: string,
  format: string,
) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TAverageBlockSize> }>(
    () =>
      `${URLS.GET_STATISTICS_AVERAGE_BLOCK_SIZE}?period=${period}&sortDirection=${sortDirection}&granularity=${granularity}&format=${format}`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
