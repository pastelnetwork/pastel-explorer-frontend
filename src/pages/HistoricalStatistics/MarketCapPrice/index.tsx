// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  PeriodTypes,
  transformMarketCapPriceInfo,
  getMultiLineChartData,
} from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { MarketCoinRespone, TMultiLineChartData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

const cache = new LRU(LRU_OPTIONS);

function PriceOvertime() {
  const [period, setPeriod] = useState<PeriodTypes>(periods[3][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: MarketCoinRespone }>({
    method: 'get',
    url: URLS.GET_STATISTICS_MARKET_PRICE,
  });
  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.marketCapPrice) as TCacheValue) ||
        readCacheValue(cacheList.marketCapPrice) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setTransformLineChartData(currentCache[period].parseData as TMultiLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: { period, timestamp },
      });
      if (data) {
        const parseData = transformMarketCapPriceInfo(data.data, period);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        const newParseData = getMultiLineChartData(
          parseData,
          currentCache[period]?.parseData as TMultiLineChartData,
          period,
        );
        if (isSubscribed) {
          setTransformLineChartData(newParseData);
        }
        currentCache = {
          ...currentCache,
          [period]: {
            parseData,
            lastDate: data.data.prices.length
              ? Number(data.data.prices[data.data.prices.length - 1][0])
              : currentCache[period]?.lastDate,
          },
        };
        setCacheValue(
          cacheList.marketCapPrice,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.marketCapPrice, currentCache);
      }
      setLoading(false);
    };
    loadLineChartData();
    return () => {
      isSubscribed = false;
    };
  }, [period]);

  const handlePeriodFilterChange = (per: PeriodTypes) => {
    setPeriod(per);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Market Price and Cap">
      <EChartsMultiLineChart
        chartName="marketCapPrice"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        yaxisName="USD Price"
        yaxisName1="Market Cap"
        seriesName="Price"
        seriesName1="Market Cap"
        fixedNum={5}
        fixedNum1={0}
        title="Price - Cap"
        info={info}
        offset={0.0001}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
        color={['#000', '#5470C6']}
      />
    </HistoricalStatisticsLayout>
  );
}

export default PriceOvertime;
