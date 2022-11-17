// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformMarketVolumePriceInfo } from '@utils/helpers/statisticsLib';
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
      let currentCache =
        (cache.get(cacheList.marketVolumePrice) as TCacheValue) ||
        readCacheValue(cacheList.marketVolumePrice) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setTransformLineChartData(currentCache[period] as TMultiLineChartData);
      }
      const data = await fetchStats.fetchData({
        params: { period },
      });
      if (data) {
        const parseData = transformMarketVolumePriceInfo(data.data, period);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        if (isSubscribed) {
          setTransformLineChartData(parseData);
        }
        if (!currentCache[period]) {
          currentCache = {
            ...currentCache,
            [period]: parseData,
          };
        }
        setCacheValue(
          cacheList.marketVolumePrice,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.marketVolumePrice, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Market Price and Volume">
      <EChartsMultiLineChart
        chartName="marketVolumePrice"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        yaxisName="USD Price"
        yaxisName1="Volume"
        seriesName="Price"
        seriesName1="Vol"
        fixedNum={5}
        fixedNum1={0}
        title="Price - Volume"
        info={info}
        offset={0.0001}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        seriesName1Type="line"
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default PriceOvertime;
