import { FC, useEffect, useState } from 'react';
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformBlocks } from '@utils/helpers/statisticsLib';
import {
  CHART_DEFAULT_PERIOD,
  periods,
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  info,
} from '@utils/constants/statistics';
import { IBlock } from '@utils/types/IBlocks';
import { TScatterChartData } from '@utils/types/IStatistics';
import { EChartsScatterChart } from '../Chart/EChartsScatterChart';

const redrawCycle = 6000;
const TransactionFee: FC = () => {
  // const [currentBgColor, setCurrentBgColor] = useState<string>('#0d0d0d');
  const [chartData, setChartData] = useState<TScatterChartData | null>(null);
  const [currentBgColor, setCurrentBgColor] = useState(CHART_THEME_BACKGROUND_DEFAULT_COLOR);
  const [ticker, setTicker] = useState<NodeJS.Timeout>();
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const fetchStats = useFetch<{ data: Array<IBlock> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_TRANSACTIONS_IN_BLOCK,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'DESC' },
      });
      if (data) {
        const parseData = transformBlocks(data.data);
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
          <EChartsScatterChart
            chartName="transactionsinblock"
            data={chartData?.data}
            dataX={chartData?.dataX}
            title="Transactions In Block"
            info={info}
            offset={1}
            periods={periods[0]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        )}
      </div>
    </Container>
  );
};

export default TransactionFee;