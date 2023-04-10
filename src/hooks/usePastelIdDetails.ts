import useSWR from 'swr';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import { TTicketsTypeProps } from '@pages/Details/PastelIdDetails/PastelIdDetails.helpers';

export default function usePastelIdDetails(
  id: string,
  limit: number,
  type: string,
  username: string,
  offset: number,
) {
  let qUsername = '';
  if (username) {
    qUsername = `&username=${username}`;
  }

  const { data, isLoading } = useSWR<{
    data: ITicket[];
    total: number;
    totalAllTickets: number;
    ticketsType: TTicketsTypeProps[];
    senses: TSenseRequests[];
    username: string;
    position: number;
    blockHeight: number;
    registeredDate: number;
  }>(
    `${URLS.PASTEL_ID_URL}/${id}?offset=${offset}&limit=${limit}&ticket_type=${type}${qUsername}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.data || [],
    total: data?.total || 0,
    totalAllTickets: data?.totalAllTickets || 0,
    ticketsType: data?.ticketsType || [],
    senses: data?.senses || [],
    username: data?.username || '',
    position: data?.position || -1,
    registeredDate: data?.registeredDate || 0,
    blockHeight: data?.blockHeight || 0,
    isLoading,
  };
}
