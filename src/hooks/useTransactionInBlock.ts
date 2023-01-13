import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IBlock } from '@utils/types/IBlocks';

export default function useTransactionInBlock(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: Array<IBlock> }>(
    () => `${URLS.GET_STATISTICS_TRANSACTIONS_IN_BLOCK}?period=${period}&sortDirection=DESC`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
