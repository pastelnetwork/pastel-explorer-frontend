// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformNetTotals } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { TNettotalsInfo, TMultiLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

function Nettotals() {
  const [chartData, setChartData] = useState<TMultiLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const fetchStats = useFetch<{ data: Array<TNettotalsInfo> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_NETTOTALS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'DESC' },
      });
      if (data) {
        const parseData = transformNetTotals(data.data);
        setChartData(parseData);
        console.log({ parseData });
      }
    };
    loadLineChartData();
  }, [period]);
  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor}>
      {chartData ? (
        <EChartsLineChart
          chartName="difficulty"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY1}
          dataY2={chartData?.dataY2}
          title="Network Total"
          info={info}
          period={period}
          offset={0}
          periods={periods[1]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
        />
      ) : (
        <Skeleton animation="wave" variant="rect" height={386} />
      )}
    </HistoricalStatisticsLayout>
  );
}

export default Nettotals;
