import useSWRInfinite from 'swr/infinite';

import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';
import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ITransaction } from '@utils/types/ITransactions';

import { DATA_FETCH_LIMIT } from '@pages/Movement/Movement.helpers';

export default function useMovement(
  limit: number,
  sortBy: string,
  sortDirection: SortDirectionsType,
  period: string,
  customDateRange: {
    startDate: number;
    endDate: number | null;
  },
) {
  let dateParam = '';
  if (customDateRange.startDate) {
    dateParam = `&startDate=${customDateRange.startDate}`;
    if (customDateRange.endDate) {
      dateParam += `&endDate=${customDateRange.endDate}`;
    }
  } else if (period && period !== 'custom') {
    dateParam = `&period=${period}`;
  }
  const { data, isLoading, size, setSize } = useSWRInfinite(
    index =>
      `${URLS.TRANSACTION_URL}?offset=${
        index * DATA_FETCH_LIMIT
      }&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}${dateParam}`,
    axiosGet,
    SWR_OPTIONS,
  );
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const newData: ITransaction[] = [];
  if (data?.length) {
    for (let i = 0; i < data.length; i += 1) {
      newData.push(...data[i].data);
    }
  }
  return {
    swrData: newData?.length ? newData : null,
    total: data?.[0]?.total || 0,
    isLoading: isLoadingMore,
    swrSize: size,
    swrSetSize: setSize,
  };
}
