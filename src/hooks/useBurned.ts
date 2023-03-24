import useSWRInfinite from 'swr/infinite';

import { TChartStatisticsResponse } from '@utils/types/IStatistics';
import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';

export function useBurnedByMonth(period: string) {
  const { data, isLoading } = useSWRInfinite<Array<TChartStatisticsResponse>>(
    () => `${URLS.GET_BURNED_BY_MONTH}?period=${period}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    data: data ? data[0] : [],
    isLoading,
  };
}

export function useSummary(period: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: Array<TChartStatisticsResponse>;
    totalBurned: number;
  }>(() => `${URLS.GET_TOTAL_BURNED}?period=${period}`, axiosGet, SWR_OPTIONS);
  return {
    data: data ? data[0].data : [],
    isLoading,
    totalBurned: data ? data[0].totalBurned : 0,
  };
}
