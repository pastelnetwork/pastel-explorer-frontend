import { useEffect, useState } from 'react';
import LRU from 'lru-cache';

import { TLineChartData, TTransactionsChart, TCacheValue } from '@utils/types/IStatistics';
import {
  PeriodTypes,
  transformTotalTransactionCount,
  mergeChartData,
} from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

const cache = new LRU(LRU_OPTIONS);

function TotalTransactionFees() {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const fetchStats = useFetch<{
    data: Array<TTransactionsChart>;
    startValue: number;
    endValue: number;
  }>({
    method: 'get',
    url: URLS.GET_TRANSACTIONS_CHARTS,
  });
  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.totalTransactionFees) as TCacheValue) ||
        readCacheValue(cacheList.totalTransactionFees) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TLineChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: {
          sortDirection: 'DESC',
          period,
          func: 'SUM',
          col: 'fee',
          timestamp,
        },
      });
      if (data) {
        const cacheParseData = currentCache[period]?.parseData as TLineChartData;
        const parseData = transformTotalTransactionCount(
          data.data,
          period,
          data.startValue,
          data.endValue,
          cacheParseData?.dataY[cacheParseData?.dataY?.length - 1] || 0,
          timestamp,
        );
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        const newParseData = mergeChartData(
          parseData,
          currentCache[period]?.parseData as TLineChartData,
          period,
        );
        if (isSubscribed) {
          setChartData(newParseData);
        }
        currentCache = {
          ...currentCache,
          [period]: {
            parseData: newParseData,
            lastDate: data.data.length
              ? Number(data.data[data.data.length - 1]?.label)
              : currentCache[period]?.lastDate,
          },
        };
        setCacheValue(
          cacheList.totalTransactionFees,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.totalTransactionFees, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Total Transaction Fees">
      <EChartsLineChart
        chartName="totalTransactionFees"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Total transaction fees"
        info={info}
        period={period}
        offset={10}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default TotalTransactionFees;
