// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import { TLineChartData, TAverageBlockSize } from '@utils/types/IStatistics';
import { TGranularity, PeriodTypes, transformAverageBlockSize } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  CHART_DEFAULT_PERIOD,
  BLOCK_CHART_DEFAULT_GRANULARITY,
  granularities,
  periods,
  info,
} from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const AverageBlockSize = (): JSX.Element => {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
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
    <Container>
      <div style={{ flex: 1, backgroundColor: currentBgColor }}>
        {chartData ? (
          <EChartsLineChart
            chartName="averageblocksize"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            title="Average Block Size (kB)"
            info={info}
            offset={1}
            granularities={granularities[0]}
            periods={periods[1]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
            handleGranularityFilterChange={handleGranularityFilterChange}
          />
        ) : (
          <Skeleton animation="wave" variant="rect" height={386} />
        )}
      </div>
    </Container>
  );
};

export default AverageBlockSize;
