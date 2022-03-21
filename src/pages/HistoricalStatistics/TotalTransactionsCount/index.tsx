// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { transformTotalTransactionCount } from '@utils/helpers/statisticsLib';
import { info } from '@utils/constants/statistics';
import { TTransactionsChart, TLineChartData } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function TotalTransactionCount() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const fetchStats = useFetch<{ data: Array<TTransactionsChart> }>({
    method: 'get',
    url: URLS.GET_TRANSACTIONS_CHARTS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period: 'all', func: 'COUNT', col: 'id' },
      });
      if (data) {
        const parseData = transformTotalTransactionCount(data.data);
        setChartData(parseData);
      }
    };
    loadLineChartData();
  }, []);

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Total Transaction Count">
      {chartData ? (
        <EChartsLineChart
          chartName="transactionfee"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Total Transaction Count"
          info={info}
          offset={1}
          handleBgColorChange={handleBgColorChange}
        />
      ) : (
        <Skeleton animation="wave" variant="rect" height={386} />
      )}
    </HistoricalStatisticsLayout>
  );
}

export default TotalTransactionCount;
