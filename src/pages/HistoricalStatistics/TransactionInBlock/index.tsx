// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformBlocks } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { IBlock } from '@utils/types/IBlocks';
import { useBackgroundChart } from '@utils/hooks';
import { TScatterChartData } from '@utils/types/IStatistics';
import { EChartsScatterChart } from '../Chart/EChartsScatterChart';

function TransactionInBlock() {
  const [chartData, setChartData] = useState<TScatterChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][periods[2].length - 1]);
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
    loadLineChartData();
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <Container>
      <div style={{ flex: 1, backgroundColor: currentBgColor }}>
        {chartData ? (
          <EChartsScatterChart
            chartName="transactionsinblock"
            data={chartData?.data}
            dataX={chartData?.dataX}
            title="Transactions In Block"
            info={info}
            offset={1}
            periods={periods[2]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        ) : (
          <Skeleton animation="wave" variant="rect" height={386} />
        )}
      </div>
    </Container>
  );
}

export default TransactionInBlock;
