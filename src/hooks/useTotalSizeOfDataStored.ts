import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TCascadeAndSenseChart } from '@utils/types/IStatistics';

export default function useTotalSizeOfDataStored(period: string) {
  const { data, isLoading } = useSWRInfinite<TCascadeAndSenseChart>(
    () => `${URLS.GET_STATISTICS_TOTAL_DATA_STORED_ON_CASCADE}?period=${period}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    data: data ? data[0].data : null,
    difference: data ? data[0].difference : 0,
    currentValue: data ? data[0].currentValue : 0,
    isLoading,
  };
}
