// react
import { useEffect, useState } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformBlocks, getScatterChartData } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { IBlock } from '@utils/types/IBlocks';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TScatterChartData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsScatterChart } from '../Chart/EChartsScatterChart';

const cache = new LRU(LRU_OPTIONS);

function TransactionInBlock() {
  const [chartData, setChartData] = useState<TScatterChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][periods[2].length - 1]);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<IBlock> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_TRANSACTIONS_IN_BLOCK,
  });
  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let timestamp = '';
      let currentCache =
        (cache.get(cacheList.transactionInBlock) as TCacheValue) ||
        readCacheValue(cacheList.transactionInBlock) ||
        {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period].parseData as TScatterChartData);
        timestamp = currentCache[period]?.lastDate?.toString() || '';
      }
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'DESC', timestamp },
      });
      if (data) {
        const parseData = transformBlocks(data.data);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        const newParseData = getScatterChartData(
          parseData,
          currentCache[period]?.parseData as TScatterChartData,
          period,
        );
        if (isSubscribed) {
          setChartData(parseData);
        }
        currentCache = {
          ...currentCache,
          [period]: {
            parseData: newParseData,
            lastDate: data.data.length
              ? Number(data.data[data.data.length - 1]?.timestamp)
              : currentCache[period]?.lastDate,
          },
        };
        setCacheValue(
          cacheList.transactionInBlock,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.transactionInBlock, currentCache);
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Transactions In Block">
      <EChartsScatterChart
        chartName="transactionsinblock"
        data={chartData?.data}
        dataX={chartData?.dataX}
        title="Transactions In Block"
        info={info}
        offset={1}
        period={period}
        periods={periods[2]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default TransactionInBlock;
