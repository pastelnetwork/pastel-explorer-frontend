import { useState, ChangeEvent, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import parse from 'html-react-parser';

import {
  PeriodTypes,
  transformChartData,
  generatePeriodToDropdownOptions,
} from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { periods, cacheList } from '@utils/constants/statistics';
import { getCurrencyName } from '@utils/appInfo';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { translate } from '@utils/helpers/i18n';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

import * as StatisticsStyles from '../Statistics.styles';
import { ITransformBlocksData } from '../BlockStatistics/BlockStatistics.helpers';

interface IVolumeTransactions {
  blockElements: ITransformBlocksData[];
}

const VolumeTransactions: React.FC<IVolumeTransactions> = ({ blockElements }) => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const volumeTransactionsData = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
    res => transformChartData(res, true),
    undefined,
    undefined,
    [period, blockElements],
  );

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.volumeTransactions) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!volumeTransactionsData.isLoading && volumeTransactionsData.data) {
      const parseData = volumeTransactionsData.data;
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.volumeTransactions,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, volumeTransactionsData.isLoading]);

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
    <SummaryStyles.Card className="statistics-card">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">
            {parse(
              translate('pages.statistics.volumeOfTransactions', { currency: getCurrencyName() }),
            )}
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
              {parse(translate('common.loadingData'))}
            </StatisticsStyles.LoadingText>
          </StatisticsStyles.Loader>
        ) : null}
        {!chartData ? (
          <>
            <Skeleton animation="wave" variant="rect" height={300} />
            <StatisticsStyles.LoadingText>
              {parse(translate('common.loadingData'))}
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
