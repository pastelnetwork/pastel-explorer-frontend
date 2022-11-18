// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  PeriodTypes,
  transformBlockchainSizeData,
  getChartData,
} from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
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
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.blockchainSize) as TCacheValue) ||
        readCacheValue(cacheList.blockchainSize) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }

      const data = await fetchStats.fetchData({
        params: {
          period,
          sortDirection: 'DESC',
          func: 'SUM',
          col: 'size',
          name: 'blockchainSize',
          timestamp,
        },
      });
      if (data) {
        const cacheParseData = currentCache[period]?.parseData as TLineChartData;
        const parseData = transformBlockchainSizeData(
          data.data,
          period,
          data.startValue,
          data.endValue,
          cacheParseData?.dataY[cacheParseData?.dataY?.length - 1] || 0,
        );
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        const newParseData = getChartData(
          parseData,
          currentCache[period]?.parseData as TLineChartData,
          period,
        );
        if (isSubscribed) {
          setChartData(newParseData);
        }
        if (!currentCache[period]) {
          currentCache = {
            ...currentCache,
            [period]: {
              parseData: newParseData,
              lastDate: Number(data.data[data.data.length - 1].label),
            },
          };
        }
        setCacheValue(
          cacheList.blockchainSize,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
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
