import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TicketsList } from '@utils/types/ITransactions';
import { DATA_LIMIT } from '@pages/Tickets/Tickets.helpers';

export default function useTickets(type: string, limit: number, DATA_FETCH_LIMIT = DATA_LIMIT) {
  const { data, isLoading, size, setSize } = useSWRInfinite(
    index => `${URLS.GET_TICKETS}/${type}?offset=${index * DATA_FETCH_LIMIT}&limit=${limit}`,
    axiosGet,
  );

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const newData: TicketsList[] = [];
  if (data?.length) {
    for (let i = 0; i < data.length; i += 1) {
      newData.push(...data[i].tickets);
    }
  }
  return {
    data: newData,
    total: data?.[0]?.total || 0,
    isLoading: isLoadingMore,
    size,
    setSize,
  };
}
