// react
import { useEffect, useState } from 'react';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformBlockchainSizeData } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { TLineChartData, TTransactionsChart } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function BlockchainSize() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const fetchStats = useFetch<{
    data: Array<TTransactionsChart>;
    startValue: number;
    endValue: number;
  }>({
    method: 'get',
    url: URLS.GET_BLOCKS_CHARTS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
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
        setChartData(parseData);
      }
    };
    loadLineChartData();
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
        isLoading={fetchStats.isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default BlockchainSize;
