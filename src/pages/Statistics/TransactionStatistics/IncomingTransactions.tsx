import { useState, ChangeEvent } from 'react';
import { Skeleton } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  transformChartData,
  PeriodTypes,
  generatePeriodToDropdownOptions,
} from '@utils/helpers/statisticsLib';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { periods } from '@utils/constants/statistics';
import * as URLS from '@utils/constants/urls';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';
import * as StatisticsStyles from '../Statistics.styles';

const BLOCK_ELEMENTS_COUNT = 8;

const StatisticsBlocks: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][0]);
  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    {
      method: 'get',
      url: URLS.INCOMING_TRANSACTION_URL,
      params: { limit: BLOCK_ELEMENTS_COUNT, period },
    },
    transformChartData,
    undefined,
    undefined,
    [period],
  );

  const handleDropdownChange = (
    event: ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      setPeriod(event.target.value as PeriodTypes);
    }
  };

  return (
    <SummaryStyles.Card className="cascade-sense-card">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">Incoming transactions</SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper>
          <Styles.Percentage>
            <Dropdown
              value={period}
              onChange={handleDropdownChange}
              options={generatePeriodToDropdownOptions(periods[2])}
              classNameWrapper="cascade-sense-statistics"
            />
          </Styles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <StatisticsStyles.ChartSection>
        {isLoading ? (
          <StatisticsStyles.Loader>
            <CircularProgress size={40} />
          </StatisticsStyles.Loader>
        ) : null}
        {!chartData ? (
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
      </StatisticsStyles.ChartSection>
    </SummaryStyles.Card>
  );
};

export default StatisticsBlocks;
