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
) {
  let typesParam = '';
  if (types.length) {
    typesParam = `&types=${types.join(',')}`;
  }
  const { data, isLoading, size, setSize } = useSWRInfinite(
    index =>
      `${URLS.BLOCK_URL}?offset=${
        index * DATA_FETCH_LIMIT
      }&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&period=${period}${typesParam}`,
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
    total: data?.[0]?.total || 0,
    isLoading: isLoadingMore,
    swrSize: size,
    swrSetSize: setSize,
  };
}
