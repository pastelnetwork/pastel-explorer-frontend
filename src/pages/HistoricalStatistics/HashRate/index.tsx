// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformCharts } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { TChartResponseItem, TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function HashRate() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const fetchStats = useFetch<{ data: Array<TChartResponseItem> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_MINING_CHARTS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'DESC', func: 'AVG', col: 'networkhashps' },
      });
      if (data) {
        const parseData = transformCharts(data.data, 10e3);
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
          chartName="hashrate"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Hashrate(MH/s)"
          info={info}
          offset={10}
          period={period}
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

export default HashRate;
