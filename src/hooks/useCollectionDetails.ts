import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ICollectionDetail, ICollectionItem } from '@utils/types/ITransactions';
import { SWR_OPTIONS } from '@utils/constants/statistics';

export const DATA_FETCH_LIMIT = 18;

export default function useCollectionDetails(id: string) {
  const { data, isLoading } = useSWR<{ collection: ICollectionDetail }>(
    `${URLS.GET_COLLECTION_DETAILS_URL}?collection_id=${id}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    collection: data?.collection,
    isLoading,
  };
}

export function useCollectionItems(id: string) {
  const { data, isLoading, size, setSize } = useSWRInfinite(
    index =>
      `${URLS.GET_COLLECTION_ITEMS}?collection_id=${id}&offset=${
        index * DATA_FETCH_LIMIT
      }&limit=${DATA_FETCH_LIMIT}`,
    axiosGet,
    SWR_OPTIONS,
  );
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const newData: ICollectionItem[] = [];
  if (data?.[0]?.items?.length) {
    for (let i = 0; i < data[0].items.length; i += 1) {
      newData.push(...data[0].items[i].data);
    }
  }
  return {
    items: newData?.length ? newData : null,
    totalItems: data?.[0]?.totalItems || 0,
    isLoadingMore,
    swrSize: size,
    swrSetSize: setSize,
  };
}
