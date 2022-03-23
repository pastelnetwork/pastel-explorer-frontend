// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import { TLineChartData, TAverageBlockSize } from '@utils/types/IStatistics';
import { TGranularity, PeriodTypes, transformAverageBlockSize } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  BLOCK_CHART_DEFAULT_GRANULARITY,
  granularities,
  periods,
  info,
} from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const AverageBlockSize = (): JSX.Element => {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [granularity, setGranularity] = useState<TGranularity>(BLOCK_CHART_DEFAULT_GRANULARITY);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const fetchStats = useFetch<{ data: Array<TAverageBlockSize> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_AVERAGE_BLOCK_SIZE,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period, granularity },
      });
      if (data) {
        const parseData = transformAverageBlockSize(data.data);
        setChartData(parseData);
      }
    };
    loadLineChartData();
  }, [granularity, period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  const handleGranularityFilterChange = (value: TGranularity) => {
    setGranularity(value);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Average Block Size">
      {chartData ? (
        <EChartsLineChart
          chartName="averageblocksize"
          dataX={chartData?.dataX}
          dataY={chartData?.dataY}
          title="Average Block Size (kB)"
          info={info}
          offset={1}
          period={period}
          granularity={granularity}
          granularities={granularities[0]}
          periods={periods[1]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
          handleGranularityFilterChange={handleGranularityFilterChange}
          setHeaderBackground
        />
      ) : (
        <Skeleton animation="wave" variant="rect" height={386} />
      )}
    </HistoricalStatisticsLayout>
  );
};

export default AverageBlockSize;
