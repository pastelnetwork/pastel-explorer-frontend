import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ITransactionDetails } from '@utils/types/ITransactions';

export default function useTransactionDetails(id: string) {
  const { data, isLoading } = useSWR<{ data: ITransactionDetails }>(
    `${URLS.TRANSACTION_URL}/${id}`,
    axiosGet,
  );
  return {
    data: data?.data,
    isLoading,
  };
}
