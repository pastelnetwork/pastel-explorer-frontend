// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformMarketCapPriceInfo } from '@utils/helpers/statisticsLib';
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
      let isAddNewNode = true;
      let currentCache =
        (cache.get(cacheList.marketCapPrice) as TCacheValue) ||
        readCacheValue(cacheList.marketCapPrice) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setTransformLineChartData(currentCache[period].parseData as TMultiLineChartData);
        isAddNewNode = false;
      }
      const data = await fetchStats.fetchData({
        params: { period },
      });
      if (data) {
        const parseData = transformMarketCapPriceInfo(data.data, period, isAddNewNode);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        if (isSubscribed) {
          setTransformLineChartData(parseData);
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
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title="Market Price and Circ. Cap ($USD)"
    >
      <EChartsMultiLineChart
        chartName="marketCapPrice"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        yaxisName="Price ($USD)"
        yaxisName1="Circ. Cap ($USD)"
        seriesName="Price"
        seriesName1="Market Cap"
        fixedNum={5}
        fixedNum1={2}
        title="Market Price and Circ. Cap ($USD)"
        info={info}
        offset={0.0001}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
        color={['#000', '#5470C6']}
        symbol="$"
        symbol1="$"
      />
    </HistoricalStatisticsLayout>
  );
}

export default PriceOvertime;
