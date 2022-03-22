// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformTransactionPerSecond } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { TTransactionPerSecond, TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

function TransactionPerSecond() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const fetchStats = useFetch<{ data: Array<TTransactionPerSecond> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_TRANSACTION_PER_SECOND,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period },
      });
      if (data) {
        const parseData = transformTransactionPerSecond(data.data);
        setChartData(parseData);
      }
    };
    loadLineChartData();
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Historical statistics">
      {chartData ? (
        <EChartsLineChart
          chartName="transactionspersecond"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Transactions Per Second"
          period={period}
          info={info}
          offset={0.05}
          periods={periods[1]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          setHeaderBackground
        />
      ) : (
        <Skeleton animation="wave" variant="rect" height={386} />
      )}
    </HistoricalStatisticsLayout>
  );
}

export default TransactionPerSecond;
