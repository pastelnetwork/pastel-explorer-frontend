import useSWR from 'swr';

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
  offset: number,
  sort: string,
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
  const { data, isLoading } = useSWR<{
    data: ITicket[];
    total: number;
    senses: TSenseRequests[];
  }>(
    `${URLS.GET_TICKETS}/${type}?offset=${offset}&limit=${limit}&sort=${sort}&type=${type}${dateParam}${qStatus}&include=all`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    data: data?.data?.length ? [...data.data] : [],
    total: data?.total || 0,
    senses: data?.senses?.length ? [...data.senses] : [],
    isLoading,
  };
}
