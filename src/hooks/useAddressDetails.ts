import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';

import { TChartStatisticsResponse } from '@utils/types/IStatistics';
import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IAddress } from '@utils/types/IAddress';
import { formattedDate } from '@utils/helpers/date/date';
import { isPastelBurnAddress } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';
import { DATA_FETCH_LIMIT } from '@pages/Details/AddressDetails/AddressDetails.helpers';

interface IAddressDetails {
  outgoingSum: number;
  incomingSum: number;
}

export default function useAddressDetails(id: string) {
  const { data, isLoading } = useSWR<IAddressDetails>(
    `${URLS.ADDRESS_URL}/${id}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    isLoading,
    outgoingSum: data?.outgoingSum || 0,
    incomingSum: data?.incomingSum || 0,
  };
}

export function useBalanceHistory(id: string, period: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: Array<TChartStatisticsResponse>;
    incoming: Array<TChartStatisticsResponse>;
    outgoing: Array<TChartStatisticsResponse>;
  }>(() => `${URLS.BALANCE_HISTORY_URL}/${id}?period=${period}`, axiosGet, SWR_OPTIONS);

  return {
    balance: data ? data[0].data : [],
    incoming: data ? data[0].incoming : [],
    outgoing: data ? data[0].outgoing : [],
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
              ? translate('pages.addressDetails.balanceHistory.sent')
              : translate(
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
