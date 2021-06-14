import { FC, useEffect, useState } from 'react';
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformDifficultyInfo } from '@utils/helpers/statisticsLib';
import {
  CHART_DEFAULT_PERIOD,
  periods,
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
} from '@utils/constants/statistics';
import { IDifficulty, TLineChartData } from '@utils/types/IStatistics';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

const info: any = {
  connections: 8,
  currencyName: 'PSL',
  disconnected: false,
  latestBlock: 71976,
  pslPrice: undefined,
  solps: 2652525,
  testnet: false,
  verificationProgress: 0.9999843360337557,
  version: 1000029,
};

const redrawCycle = 6000;
const Difficulty: FC = () => {
  // const [currentBgColor, setCurrentBgColor] = useState<string>('#0d0d0d');
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, setCurrentBgColor] = useState(CHART_THEME_BACKGROUND_DEFAULT_COLOR);
  const [ticker, setTicker] = useState<NodeJS.Timeout>();
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const fetchStats = useFetch<{ data: Array<IDifficulty> }>({
    method: 'get',
    url: URLS.GET_STATISTICS,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { limit: 50, offset: 0, sortDirection: 'DESC' },
      });
      if (data) {
        const parseData = transformDifficultyInfo(data.data, period);
        setChartData(parseData);
      }
    };
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

  const handleBgColorChange = (color: string) => {
    setCurrentBgColor(color);
  };
  return (
    <Container>
      <div style={{ flex: 1, backgroundColor: currentBgColor }}>
        {chartData && (
          <EChartsLineChart
            chartName="difficulty"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            title="Network Difficulty"
            info={info}
            offset={10000}
            periods={periods[0]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        )}
      </div>
    </Container>
  );
};

export default Difficulty;
