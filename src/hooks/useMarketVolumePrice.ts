import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { MarketCoinRespone } from '@utils/types/IStatistics';

export default function useMarketVolumePrice(period: string) {
  const { data, isLoading } = useSWRInfinite<{ data: MarketCoinRespone }>(
    () => `${URLS.GET_STATISTICS_MARKET_PRICE}?period=${period}&chart_name=volume`,
    axiosGet,
  );
  return {
    data: data ? data[0].data : null,
    isLoading,
  };
}
