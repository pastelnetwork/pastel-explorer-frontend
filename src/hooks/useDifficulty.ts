import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IStatistic } from '@utils/types/IStatistics';

export default function useDifficulty(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<IStatistic> }>(
    () =>
      `${URLS.GET_HISTORICAL_STATISTICS}?period=${period}&sortDirection=DESC&fields=difficulty,timestamp`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
