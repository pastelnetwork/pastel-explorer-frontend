import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';
import { IBlock } from '@utils/types/IBlocks';

import { DATA_FETCH_LIMIT } from '@pages/Blocks/Blocks.helpers';

export default function useBlocks(
  limit: number,
  sortBy: string,
  sortDirection: SortDirectionsType,
  period: string,
  types: string[],
  customDateRange: {
    startDate: number;
    endDate: number | null;
  },
) {
  let typesParam = '';
  if (types.length) {
    typesParam = `&types=${types.join(',')}`;
  }
  let dateParam = '';
  if (customDateRange.startDate) {
    dateParam = `&startDate=${customDateRange.startDate}`;
    if (customDateRange.endDate) {
      dateParam += `&endDate=${customDateRange.endDate}`;
    }
  } else if (period && period !== 'custom') {
    dateParam = `&period=${period}`;
  }
  let newSortBy = sortBy;
  if (sortBy === 'blockHash') {
    newSortBy = 'id';
  }
  if (sortBy === 'blockId') {
    newSortBy = 'height';
  }
  const { data, isLoading, size, setSize } = useSWRInfinite(
    index =>
      `${URLS.BLOCK_URL}?offset=${index * DATA_FETCH_LIMIT}&limit=${
        limit + 1
      }&sortBy=${newSortBy}&sortDirection=${sortDirection}${dateParam}${typesParam}`,
    axiosGet,
    SWR_OPTIONS,
  );
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const newData: IBlock[] = [];
  if (data?.length) {
    for (let i = 0; i < data.length; i += 1) {
      newData.push(...data[i].data);
    }
  }

  return {
    swrData: newData?.length ? newData : null,
    total: data?.[0]?.total || newData?.[0]?.height || 0,
    isLoading: isLoadingMore,
    swrSize: size,
    swrSetSize: setSize,
  };
}

export function useMempool(limit: number) {
  const { data, isLoading, size, setSize } = useSWRInfinite(
    index => `${URLS.GET_MEMPOOL_URL}?offset=${index * DATA_FETCH_LIMIT}&limit=${limit}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    swrData: data?.[0]?.data || null,
    total: data?.[0]?.total || 0,
    isLoading,
    swrSize: size,
    swrSetSize: setSize,
  };
}
