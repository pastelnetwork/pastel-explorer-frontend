import useSWR from 'swr';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import { TTicketsTypeProps } from '@pages/Details/PastelIdDetails/PastelIdDetails.helpers';

export default function usePastelIdDetails(
  id: string,
  offset: number,
  limit: number,
  type: string,
) {
  const { data, isLoading } = useSWR<{
    data: ITicket[];
    total: number;
    totalAllTickets: number;
    ticketsType: TTicketsTypeProps[];
    senses: TSenseRequests[];
  }>(
    `${URLS.PASTEL_ID_URL}/${id}?offset=${offset}&limit=${limit}&type=${type}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.data ? data?.data : [],
    total: data?.total || 0,
    totalAllTickets: data?.totalAllTickets || 0,
    ticketsType: data?.ticketsType || [],
    senses: data?.senses || [],
    isLoading,
  };
}
