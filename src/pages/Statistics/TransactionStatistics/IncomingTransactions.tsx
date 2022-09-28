import * as React from 'react';
import { Skeleton } from '@material-ui/lab';

import { transformChartData } from '@utils/helpers/statisticsLib';
import { LineChart } from '@components/Summary/LineChart';
import * as URLS from '@utils/constants/urls';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

const BLOCK_ELEMENTS_COUNT = 8;

const StatisticsBlocks: React.FC = () => {
  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: URLS.INCOMING_TRANSACTION_URL, params: { limit: BLOCK_ELEMENTS_COUNT } },
    transformChartData,
    undefined,
    undefined,
    [],
  );

  return (
    <SummaryStyles.Card className="cascade-sense-card">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">Incoming transactions</SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper>
          <Styles.Percentage>&nbsp;</Styles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <div>
        {!chartData || isLoading ? (
          <Skeleton animation="wave" variant="rect" height={170} />
        ) : (
          <LineChart
            chartName="incomingTransactions"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={1}
            disableClick
          />
        )}
      </div>
    </SummaryStyles.Card>
  );
};

export default StatisticsBlocks;
