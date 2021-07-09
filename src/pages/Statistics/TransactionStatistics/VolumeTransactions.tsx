import { useState, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';

import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';

import { PeriodTypes, transformChartData } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';

const CHART_HEIGHT = 386;

const NetworkStatistics: React.FC = () => {
  const [period, setPeriod] = useState(periods[1][periods[1].length - 1]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const { fetchData } = useFetch<IHashRateResponse>({
    method: 'get',
    url: `${URLS.VOLUME_TRANSACTION_URL}?period=${period}`,
  });
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const fetchHashrateData = () => {
    fetchData().then(response => {
      if (!response) return null;
      const data = transformChartData(response);
      return setChartData(data);
    });
  };
  useEffect(() => {
    fetchHashrateData();
  }, [period]);
  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };
  if (!chartData) {
    return <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />;
  }
  return (
    <div style={{ flex: 1, backgroundColor: currentBgColor }}>
      <EChartsLineChart
        chartName="averageblocksize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Volume of transactions (PSL)"
        info={info}
        offset={1000}
        periods={periods[1]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
      />
    </div>
  );
};

export default NetworkStatistics;
