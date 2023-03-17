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
import { translate } from '@utils/helpers/i18n';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';
import * as StatisticsStyles from '../Statistics.styles';
import { ITransformBlocksData } from '../BlockStatistics/BlockStatistics.helpers';

interface NetworkStatistics {
  blockElements: ITransformBlocksData[];
}

const NetworkStatistics: React.FC<NetworkStatistics> = ({ blockElements }) => {
  const [period, setPeriod] = useState(periods[2][0]);
  const { isLoading, data: chartData } = useDeferredData<{ data: TMiningInfo[] }, TLineChartData>(
    { method: 'get', url: `${URLS.GET_STATISTICS_HASHRATE}?period=${period}` },
    ({ data }) => transformHashrateInfo(data.sort((a, b) => a.timestamp - b.timestamp)),
    undefined,
    undefined,
    [period, blockElements],
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
            {translate('pages.statistics.hashrate')}
          </SummaryStyles.Typography>
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
            <StatisticsStyles.LoadingText>
              {translate('common.loadingData')}
            </StatisticsStyles.LoadingText>
          </StatisticsStyles.Loader>
        ) : null}
        {!chartData ? (
          <>
            <Skeleton animation="wave" variant="rect" height={300} />
            <StatisticsStyles.LoadingText>
              {translate('common.loadingData')}
            </StatisticsStyles.LoadingText>
          </>
        ) : (
          <LineChart
            chartName="networkStatistics"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={10000}
            disableClick
          />
        )}
      </StatisticsStyles.ChartSection>
    </SummaryStyles.Card>
  );
};

export default NetworkStatistics;
