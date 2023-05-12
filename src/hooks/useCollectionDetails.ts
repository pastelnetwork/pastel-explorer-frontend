import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ICollectionDetail } from '@utils/types/ITransactions';
import { SWR_OPTIONS } from '@utils/constants/statistics';
import { mockup } from '@pages/Details/CollectionDetails/mockup';

export default function useCollectionDetails(id: string) {
  const { data, isLoading } = useSWR<{ collection: ICollectionDetail }>(
    `${URLS.GET_COLLECTION_DETAILS_URL}?collection_id=${id}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    collection: data?.collection,
    items: mockup,
    isLoading,
  };
}
