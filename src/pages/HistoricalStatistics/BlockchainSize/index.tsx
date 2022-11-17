// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformBlockchainSizeData } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { TLineChartData, TTransactionsChart, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function BlockchainSize() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{
    data: Array<TTransactionsChart>;
    startValue: number;
    endValue: number;
  }>({
    method: 'get',
    url: URLS.GET_BLOCKS_CHARTS,
  });

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let currentCache = (cache.get(cacheList.blockchainSize) as TCacheValue) || {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period] as TLineChartData);
      }

      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'DESC', func: 'SUM', col: 'size', name: 'blockchainSize' },
      });
      if (data) {
        const parseData = transformBlockchainSizeData(
          data.data,
          period,
          data.startValue,
          data.endValue,
        );
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        if (isSubscribed) {
          setChartData(parseData);
        }
        if (!currentCache[period]) {
          currentCache = {
            ...currentCache,
            [period]: parseData,
          };
        }
        cache.set(cacheList.blockchainSize, currentCache);
      }
      setLoading(false);
    };
    loadLineChartData();
    return () => {
      isSubscribed = false;
    };
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Blockchain Size">
      <EChartsLineChart
        chartName="blockchainSize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Blockchain Size (Mb)"
        info={info}
        period={period}
        offset={0}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default BlockchainSize;
