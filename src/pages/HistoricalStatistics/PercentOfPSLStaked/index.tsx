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

function PercentOfPSLStaked() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const fetchStats = useFetch<{ data: Array<TChartStatisticsResponse> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_PERCENT_OF_PSL_STAKED,
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
      title={`% of ${getCurrencyName()} Staked`}
    >
      {chartData ? (
        <EChartsLineChart
          chartName="percentOfPSLStaked"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title={`% of ${getCurrencyName()} Staked`}
          info={info}
          period={period}
          offset={0.004}
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

export default PercentOfPSLStaked;
