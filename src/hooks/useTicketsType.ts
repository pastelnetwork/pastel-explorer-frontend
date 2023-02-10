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
) {
  let qStatus = '';
  if (status) {
    qStatus = `&status=${status}`;
  }
  const { data, isLoading, size, setSize } = useSWRInfinite<{
    data: ITicket[];
    total: number;
    senses: TSenseRequests[];
  }>(
    index =>
      `${URLS.GET_TICKETS}/${type}?offset=${
        index * limit
      }&limit=${limit}&type=${type}&period=${period}${qStatus}&include=all`,
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
