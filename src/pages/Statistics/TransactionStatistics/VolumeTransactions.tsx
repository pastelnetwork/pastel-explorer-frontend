import { useState, ChangeEvent } from 'react';
import { Skeleton } from '@material-ui/lab';

import {
  PeriodTypes,
  transformChartData,
  generatePeriodToDropdownOptions,
} from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { periods } from '@utils/constants/statistics';
import { getCurrencyName } from '@utils/appInfo';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

const NetworkStatistics: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[4][0]);
  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
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
          <SummaryStyles.Typography variant="h6">
            Volume of transactions ({getCurrencyName()})
          </SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper>
          <Styles.Percentage>
            <Dropdown
              value={period}
              onChange={handleDropdownChange}
              options={generatePeriodToDropdownOptions(periods[4])}
              classNameWrapper="cascade-sense-statistics"
            />
          </Styles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <div>
        {!chartData || isLoading ? (
          <Skeleton animation="wave" variant="rect" height={386} />
        ) : (
          <LineChart
            chartName="networkStatistics"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={1000}
            disableClick
          />
        )}
      </div>
    </SummaryStyles.Card>
  );
};

export default NetworkStatistics;
