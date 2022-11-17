// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformPriceInfo } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { IStatistic, TMultiLineChartData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

const cache = new LRU(LRU_OPTIONS);

function PriceOvertime() {
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<IStatistic> }>({
    method: 'get',
    url: URLS.GET_STATISTICS,
  });

  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let currentCache =
        (cache.get(cacheList.priceOvertime) as TCacheValue) ||
        readCacheValue(cacheList.priceOvertime) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setTransformLineChartData(currentCache[period] as TMultiLineChartData);
      }
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period },
      });
      if (data) {
        const parseData = transformPriceInfo(data.data, period);
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
          cacheList.priceOvertime,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.priceOvertime, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Price">
      <EChartsMultiLineChart
        chartName="prices"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        title={`${info.currencyName} Prices`}
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
