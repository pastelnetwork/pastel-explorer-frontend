import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TFeeSchedule } from '@utils/types/IStatistics';

export default function useFeeSchedule(period: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: Array<TFeeSchedule>;
  }>(() => `${URLS.GET_HISTORICAL_FEE_SCHEDULE}?period=${period}`, axiosGet);
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
