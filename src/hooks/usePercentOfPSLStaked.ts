import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TChartStatisticsResponse } from '@utils/types/IStatistics';

export default function usePercentOfPSLStaked(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TChartStatisticsResponse> }>(
    () => `${URLS.GET_STATISTICS_PERCENT_OF_PSL_STAKED}?period=${period}&sortDirection=ASC`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
