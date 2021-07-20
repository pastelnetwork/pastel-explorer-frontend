// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// application
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformMempoolInfo } from '@utils/helpers/statisticsLib';
import { CHART_DEFAULT_PERIOD, periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { TMempoolInfo, TLineChartData } from '@utils/types/IStatistics';
import { EChartsLineChart } from '../Chart/EChartsLineChart';

function MempoolSize() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const fetchStats = useFetch<{ data: Array<TMempoolInfo> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_MEMPOOL_INFO,
  });
  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { period, sortDirection: 'DESC' },
      });
      if (data) {
        const parseData = transformMempoolInfo(data.data);
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
          <EChartsLineChart
            chartName="mempoolsize"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            title="Mempool Size(kB)"
            info={info}
            offset={1}
            periods={periods[0]}
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

export default MempoolSize;
