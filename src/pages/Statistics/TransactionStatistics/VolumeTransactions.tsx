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
import { translate } from '@utils/helpers/i18n';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

import * as StatisticsStyles from '../Statistics.styles';
import { ITransformBlocksData } from '../BlockStatistics/BlockStatistics.helpers';

interface IVolumeTransactions {
  blockElements: ITransformBlocksData[];
}

const VolumeTransactions: React.FC<IVolumeTransactions> = ({ blockElements }) => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][0]);
  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
    res => transformChartData(res, true),
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
            {translate('pages.statistics.volumeOfTransactions', { currency: getCurrencyName() })}
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
            chartName="volumeTransactions"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={1000}
            disableClick
          />
        )}
      </StatisticsStyles.ChartSection>
    </SummaryStyles.Card>
  );
};

export default VolumeTransactions;
