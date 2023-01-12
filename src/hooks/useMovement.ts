import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';

export default function useMovement(
  offset: number,
  limit: number,
  sortBy: string,
  sortDirection: SortDirectionsType,
  period: string,
) {
  const { data, isLoading } = useSWRInfinite(
    () =>
      `${URLS.TRANSACTION_URL}?offset=${offset}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&period=${period}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    swrData: data ? data[0] : null,
    isLoading,
  };
}
