import { useEffect, useState } from 'react';

import { TLineChartData, TTransactionsChart } from '@utils/types/IStatistics';
import { PeriodTypes, transformTotalData } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function TotalTransactionFees() {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const fetchStats = useFetch<{ data: Array<TTransactionsChart> }>({
    method: 'get',
    url: URLS.GET_TRANSACTIONS_CHARTS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period, func: 'SUM', col: 'fee' },
      });
      if (data) {
        const parseData = transformTotalData(data.data, 1);
        setChartData(parseData);
      }
    };
    loadLineChartData();
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Total Transaction Fees">
      {chartData && (
        <EChartsLineChart
          chartName="averageblocksize"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Total transaction fees"
          info={info}
          period={period}
          offset={1}
          periods={periods[6]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          setHeaderBackground
        />
      )}
    </HistoricalStatisticsLayout>
  );
}

export default TotalTransactionFees;
