import useSWRInfinite from 'swr/infinite';

import { TChartStatisticsResponse } from '@utils/types/IStatistics';
import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IAddress } from '@utils/types/IAddress';
import { formattedDate } from '@utils/helpers/date/date';
import { isPastelBurnAddress } from '@utils/appInfo';
import { translateDropdown } from '@utils/helpers/i18n';
import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';
import { DATA_FETCH_LIMIT } from '@pages/Details/AddressDetails/AddressDetails.helpers';

export type TBalanceHistory = {
  balance: TChartStatisticsResponse[];
  received: TChartStatisticsResponse[];
  sent: TChartStatisticsResponse[];
};

export function useBalanceHistory(id: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: Array<TChartStatisticsResponse>;
    incoming: Array<TChartStatisticsResponse>;
    outgoing: Array<TChartStatisticsResponse>;
    totalReceived: number;
    totalSent: number;
    type: string;
  }>(() => `${URLS.BALANCE_HISTORY_URL}/${id}`, axiosGet, SWR_OPTIONS);

  return {
    data: {
      balance: data ? data[0].data : [],
      received: data ? data[0].incoming : [],
      sent: data ? data[0].outgoing : [],
      totalReceived: data ? data[0].totalReceived : 0,
      totalSent: data ? data[0].totalSent : 0,
      type: data ? data[0].type : '',
    },
    isFetchData: !!data,
    isLoading,
  };
}

export function useLatestTransactions(
  id: string,
  limit: number,
  sortBy: string,
  sortDirection: SortDirectionsType,
) {
  const { data, isLoading, size, setSize } = useSWRInfinite<IAddress>(
    index =>
      `${URLS.LATEST_TRANSACTIONS_URL}/${id}?offset=${
        index * DATA_FETCH_LIMIT
      }&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
    axiosGet,
    SWR_OPTIONS,
  );

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const newData = [];
  const csvData = [];
  if (data?.length) {
    for (let i = 0; i < data.length; i += 1) {
      newData.push(...data[i].data);

      for (let j = 0; j < data[i].data.length; j += 1) {
        csvData.push({
          transactionHash: data[i].data[j].transactionHash,
          amount: data[i].data[j].amount,
          direction:
            data[i].data[j].direction === 'Outgoing'
              ? translateDropdown('pages.addressDetails.balanceHistory.sent')
              : translateDropdown(
                  `pages.addressDetails.balanceHistory.${
                    isPastelBurnAddress(id) ? 'burned' : 'received'
                  }`,
                ),
          timestamp: formattedDate(data[i].data[j].timestamp, {
            dayName: false,
          }),
        });
      }
    }
  }

  return {
    addresses: data?.length ? newData : null,
    isLoading: isLoadingMore,
    csvData,
    swrSize: size,
    swrSetSize: setSize,
  };
}

export function useDirection(id: string, period: string, direction: string) {
  const { data, isLoading } = useSWRInfinite<Array<TChartStatisticsResponse>>(
    () => `${URLS.DIRECTION_URL}/${id}?period=${period}&direction=${direction}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    data: data ? data[0] : [],
    isLoading,
  };
}
