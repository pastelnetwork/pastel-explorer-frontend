import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IAddress } from '@utils/types/IAddress';
import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';

export default function useAddressDetails(
  id: string,
  offset: number,
  limit: number,
  sortBy: string,
  sortDirection: SortDirectionsType,
) {
  const { data, isLoading } = useSWRInfinite<IAddress>(
    () =>
      `${URLS.ADDRESS_URL}/${id}?offset=${offset}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    swrData: data ? data[0] : null,
    isLoading,
  };
}
