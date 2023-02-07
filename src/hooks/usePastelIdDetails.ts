import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import { TTicketsTypeProps } from '@pages/Details/PastelIdDetails/PastelIdDetails.helpers';

export default function usePastelIdDetails(id: string, limit: number, type: string) {
  const { data, isLoading, size, setSize } = useSWRInfinite<{
    data: ITicket[];
    total: number;
    totalAllTickets: number;
    ticketsType: TTicketsTypeProps[];
    senses: TSenseRequests[];
  }>(
    index => `${URLS.PASTEL_ID_URL}/${id}?offset=${index * limit}&limit=${limit}&type=${type}`,
    axiosGet,
    SWR_OPTIONS,
  );
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const newData: ITicket[] = [];
  if (data?.length) {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].data) {
        newData.push(...data[i].data);
      }
    }
  }

  return {
    data: newData,
    total: data?.[0]?.total || 0,
    totalAllTickets: data?.[0]?.totalAllTickets || 0,
    ticketsType: data?.[0]?.ticketsType || [],
    senses: data?.[0]?.senses || [],
    isLoading: isLoadingMore,
    size,
    setSize,
  };
}
