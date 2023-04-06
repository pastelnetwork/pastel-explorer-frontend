import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TSenseRequests } from '@utils/types/ITransactions';

export default function useSenseDetails(id: string, txid: string) {
  const { data, isLoading } = useSWR<{ data: TSenseRequests }>(
    `${URLS.SENSE_URL}?registration_ticket_txid=${txid}&media_file_hash=${id}`,
    axiosGet,
  );

  return {
    senseData: data?.data,
    isLoading,
  };
}
