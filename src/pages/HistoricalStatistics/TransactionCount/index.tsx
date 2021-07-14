import { useEffect, useState } from 'react';
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformTransactionsChartData } from '@utils/helpers/statisticsLib';
import { CHART_DEFAULT_PERIOD, periods, info } from '@utils/constants/statistics';
import { TTransactionsChart, TLineChartData } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const redrawCycle = 6000;

function StatisticsTransactionsCount() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [ticker, setTicker] = useState<NodeJS.Timeout>();
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const fetchStats = useFetch<{ data: Array<TTransactionsChart> }>({
    method: 'get',
    url: URLS.GET_TRANSACTIONS_CHARTS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period, sqlQuery: 'COUNT(id)' },
      });
      if (data) {
        const parseData = transformTransactionsChartData(data.data);
        setChartData(parseData);
      }
    };
    loadLineChartData();
    const newTicker = setInterval(() => {
      loadLineChartData();
    }, redrawCycle);
    setTicker(newTicker);
    return () => {
      if (newTicker) {
        clearInterval(newTicker);
      }
    };
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
    clearInterval(ticker as NodeJS.Timeout);
  };

  return (
    <Container>
      <div style={{ flex: 1, backgroundColor: currentBgColor }}>
        {chartData && (
          <EChartsLineChart
            chartName="transactionspersecond"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            title="Transaction Count"
            info={info}
            offset={1000}
            periods={periods[1]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        )}
      </div>
    </Container>
  );
}

export default StatisticsTransactionsCount;
