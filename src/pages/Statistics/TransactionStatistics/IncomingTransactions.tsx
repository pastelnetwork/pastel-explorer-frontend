import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

import { transformChartData } from '@utils/helpers/statisticsLib';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';

import * as URLS from '@utils/constants/urls';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { useBackgroundChart } from '@utils/hooks';

import { info } from '@utils/constants/statistics';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';

import * as Styles from '../Statistics.styles';

const BLOCK_ELEMENTS_COUNT = 8;

const StatisticsBlocks: React.FC = () => {
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: URLS.INCOMING_TRANSACTION_URL, params: { limit: BLOCK_ELEMENTS_COUNT } },
    transformChartData,
    undefined,
    undefined,
    [],
  );
  if (!chartData || isLoading) {
    return (
      <Styles.Loader>
        <CircularProgress size={40} />
      </Styles.Loader>
    );
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
