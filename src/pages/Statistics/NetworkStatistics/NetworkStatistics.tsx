import { useState, ChangeEvent } from 'react';
import { Skeleton } from '@material-ui/lab';

import { TMiningInfo, TLineChartData } from '@utils/types/IStatistics';
import {
  PeriodTypes,
  transformHashrateInfo,
  generatePeriodToDropdownOptions,
} from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { periods } from '@utils/constants/statistics';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

const NetworkStatistics: React.FC = () => {
  const [period, setPeriod] = useState(periods[2][periods[2].length - 1]);

  const { isLoading, data: chartData } = useDeferredData<{ data: TMiningInfo[] }, TLineChartData>(
    { method: 'get', url: `${URLS.GET_STATISTICS_HASHRATE}?period=${period}` },
    ({ data }) => transformHashrateInfo(data),
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
          <SummaryStyles.Typography variant="h6">Hashrate(MSol/S)</SummaryStyles.Typography>
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
      <div>
        {!chartData || isLoading ? (
          <Skeleton animation="wave" variant="rect" height={170} />
        ) : (
          <LineChart
            chartName="networkStatistics"
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

export default NetworkStatistics;
