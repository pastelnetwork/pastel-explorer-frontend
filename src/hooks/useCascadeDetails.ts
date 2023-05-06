import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TCascade } from '@utils/types/ITransactions';
import { SWR_OPTIONS } from '@utils/constants/statistics';

export default function useCascadeDetails(txid: string) {
  const { data, isLoading } = useSWR<{ data: string }>(
    `${URLS.CASCADE_URL}?registration_ticket_txid=${txid}`,
    axiosGet,
    SWR_OPTIONS,
  );

  const cascadeData = data?.data ? (JSON.parse(data?.data) as TCascade) : null;

  return {
    cascadeData,
    isLoading,
  };
}
