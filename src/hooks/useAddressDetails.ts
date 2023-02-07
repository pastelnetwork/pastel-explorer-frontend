import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IAddress } from '@utils/types/IAddress';
import { formattedDate } from '@utils/helpers/date/date';
import { SortDirectionsType } from '@components/InfinityTable/InfinityTable';
import {
  DATA_FETCH_LIMIT,
  DEFAULT_ADDRESS_DATA,
} from '@pages/Details/AddressDetails/AddressDetails.helpers';

export default function useAddressDetails(
  id: string,
  limit: number,
  sortBy: string,
  sortDirection: SortDirectionsType,
) {
  const { data, isLoading, size, setSize } = useSWRInfinite<IAddress>(
    index =>
      `${URLS.ADDRESS_URL}/${id}?offset=${
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
          timestamp: formattedDate(data[i].data[j].timestamp),
        });
      }
    }
  }

  return {
    swrData: newData.length
      ? {
          address: data?.[0]?.address || '',
          data: newData,
          incomingSum: data?.[0]?.incomingSum || 0,
          outgoingSum: data?.[0]?.outgoingSum || 0,
        }
      : DEFAULT_ADDRESS_DATA,
    isLoading: isLoadingMore,
    csvData,
    swrSize: size,
    swrSetSize: setSize,
  };
}
