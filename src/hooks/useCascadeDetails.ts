import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TCascade, TTransfer } from '@utils/types/ITransactions';
import { SWR_OPTIONS } from '@utils/constants/statistics';

export default function useCascadeDetails(txid: string) {
  const { data, isLoading } = useSWR<{
    data: string;
    creatorPastelID: string;
    currentOwnerPastelID: string;
    transfers: {
      transactionHash: string;
      pastelID: string;
      offer_txid: string;
      accept_txid: string;
      registration_txid: string;
      copy_serial_nr: number;
      transactionTime: number;
    };
  }>(`${URLS.CASCADE_URL}?registration_ticket_txid=${txid}`, axiosGet, SWR_OPTIONS);

  const cascadeData = data?.data ? (JSON.parse(data?.data) as TCascade) : null;

  return {
    cascadeData: {
      ...cascadeData,
      creatorPastelID: data?.creatorPastelID || '',
      currentOwnerPastelID: data?.currentOwnerPastelID || '',
    },
    isLoading,
  };
}

export function useTransfers(txid: string, offset: number, limit: number) {
  const { data, isLoading } = useSWR<{ items: TTransfer[]; totalItems: number }>(
    `${URLS.GET_CASCADE_TRANSFERS}?registration_ticket_txid=${txid}&offset=${offset}&limit=${limit}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.items || null,
    totalItems: data?.totalItems || 0,
    isLoading,
  };
}
