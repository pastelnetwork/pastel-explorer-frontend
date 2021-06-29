import { useEffect, useState } from 'react';

import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import { TLineChartData, TAverageBlockSize } from '@utils/types/IStatistics';
import { TGranularity, PeriodTypes, transformAverageBlockSize } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import {
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_DEFAULT_PERIOD,
  BLOCK_CHART_DEFAULT_GRANULARITY,
  granularities,
  periods,
  info,
} from '@utils/constants/statistics';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const redrawCycle = 6000;

const AverageBlockSize = (): JSX.Element => {
  const [currentBgColor, setCurrentBgColor] = useState(CHART_THEME_BACKGROUND_DEFAULT_COLOR);
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const [granularity, setGranularity] = useState<TGranularity>(BLOCK_CHART_DEFAULT_GRANULARITY);
  const [ticker, setTicker] = useState<NodeJS.Timeout>();
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
    const newTicker = setInterval(() => {
      loadLineChartData();
    }, redrawCycle);
    setTicker(newTicker);
    return () => {
      if (newTicker) {
        clearInterval(newTicker);
      }
    };
  }, [granularity, period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
    clearInterval(ticker as NodeJS.Timeout);
  };

  const handleGranularityFilterChange = (value: TGranularity) => {
    setGranularity(value);
    clearInterval(ticker as NodeJS.Timeout);
  };

  const handleBgColorChange = (color: string) => {
    setCurrentBgColor(color);
  };

  return (
    <Container>
      <div style={{ flex: 1, backgroundColor: currentBgColor }}>
        {chartData && (
          <EChartsLineChart
            chartName="averageblocksize"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            title="Average Block Size(KB)"
            info={info}
            offset={1}
            granularities={granularities[0]}
            periods={periods[1]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
            handleGranularityFilterChange={handleGranularityFilterChange}
          />
        )}
      </div>
    </Container>
  );
};

export default AverageBlockSize;
