import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';

export default function useTicketsType(
  type: string,
  limit: number,
  period: string,
  status: string,
  customDateRange: {
    startDate: number;
    endDate: number | null;
  },
) {
  let qStatus = '';
  if (status) {
    qStatus = `&status=${status}`;
  }
  let dateParam = '';
  if (customDateRange.startDate) {
    dateParam = `&startDate=${customDateRange.startDate}`;
    if (customDateRange.endDate) {
      dateParam += `&endDate=${customDateRange.endDate}`;
    }
  } else if (period && period !== 'custom') {
    dateParam = `&period=${period}`;
  }
  const { data, isLoading, size, setSize } = useSWRInfinite<{
    data: ITicket[];
    total: number;
    senses: TSenseRequests[];
  }>(
    index =>
      `${URLS.GET_TICKETS}/${type}?offset=${
        index * limit
      }&limit=${limit}&type=${type}${dateParam}${qStatus}&include=all`,
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
    senses: data?.[0]?.senses || [],
    isLoading: isLoadingMore,
    size,
    setSize,
  };
}
