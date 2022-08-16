// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformStatisticsChart } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { TChartStatisticsResponse, TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { getCurrencyName } from '@utils/appInfo';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

function CirculatingSupply() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const fetchStats = useFetch<{ data: Array<TChartStatisticsResponse> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_CIRCULATING_SUPPLY,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'ASC' },
      });
      if (data) {
        const parseData = transformStatisticsChart(data.data, period);
        setChartData(parseData);
      }
    };
    loadLineChartData();
  }, [period]);
  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title={`Circulating Supply (${getCurrencyName()})`}
    >
      {chartData ? (
        <EChartsLineChart
          chartName="circulatingSupply"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title={`Circulating Supply (${getCurrencyName()})`}
          info={info}
          period={period}
          offset={10000000}
          periods={periods[6]}
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

export default CirculatingSupply;
