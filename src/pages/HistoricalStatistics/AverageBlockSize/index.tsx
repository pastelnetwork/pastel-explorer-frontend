// react
import { useEffect, useState } from 'react';
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
        params: { sortDirection: 'DESC', period, granularity, format: 'true' },
      });
      if (data) {
        const parseData = transformAverageBlockSize(data.data, period);
        setChartData(parseData);
      }
    };
    loadLineChartData();
  }, [granularity, period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setGranularity('none');
    setPeriod(value);
  };

  const handleGranularityFilterChange = (value: TGranularity) => {
    setGranularity(value === granularity ? 'none' : value);
  };

  const getGranularitiesOptions = () => {
    if (period === periods[6][0]) {
      return undefined;
    }
    if (period === periods[6][1] || period === periods[6][2]) {
      return granularities[1];
    }
    if (period === periods[6][3] || period === periods[6][4] || period === periods[6][5]) {
      return granularities[2];
    }
    return granularities[0];
  };

  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title="Cumulative Overall Average Block Size"
    >
      <EChartsLineChart
        chartName="averageblocksize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Cumulative Overall Average Block Size (MB)"
        info={info}
        offset={10000}
        period={period}
        granularity={granularity}
        granularities={getGranularitiesOptions()}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        handleGranularityFilterChange={handleGranularityFilterChange}
        setHeaderBackground
        isLoading={fetchStats.isLoading}
      />
    </HistoricalStatisticsLayout>
  );
};

export default AverageBlockSize;
