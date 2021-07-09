import * as React from 'react';
import { Skeleton } from '@material-ui/lab';

import { transformChartData } from '@utils/helpers/statisticsLib';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { useBackgroundChart } from '@utils/hooks';

import { info } from '@utils/constants/statistics';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';

const CHART_HEIGHT = 386;

const BLOCK_ELEMENTS_COUNT = 8;

const StatisticsBlocks: React.FC = () => {
  const [chartData, setChartData] = React.useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const fetchBlocksData = useFetch<IHashRateResponse>({
    method: 'get',
    url: URLS.INCOMING_TRANSACTION_URL,
  });

  React.useEffect(() => {
    fetchBlocksData.fetchData({ params: { limit: BLOCK_ELEMENTS_COUNT } }).then(response => {
      if (response) {
        setChartData(transformChartData(response));
      }
    });
  }, []);
  if (!chartData) {
    return <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />;
  }
  return (
    <div style={{ flex: 1, backgroundColor: currentBgColor }}>
      <EChartsLineChart
        chartName="transactionfee"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Incoming transactions"
        info={info}
        offset={1}
        handleBgColorChange={handleBgColorChange}
      />
    </div>
  );
};

export default StatisticsBlocks;
