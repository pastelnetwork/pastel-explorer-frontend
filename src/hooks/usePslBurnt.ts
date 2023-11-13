import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TFeeSchedule } from '@utils/types/IStatistics';

export default function usePslBurnt(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<TFeeSchedule> }>(
    () => `${URLS.GET_TOTAL_BURNED}?period=${period}`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
