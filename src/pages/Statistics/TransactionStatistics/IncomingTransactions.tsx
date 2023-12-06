import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import parse from 'html-react-parser';
import { SelectChangeEvent } from '@mui/material/Select';

import {
  transformChartData,
  PeriodTypes,
  generatePeriodToDropdownOptions,
} from '@utils/helpers/statisticsLib';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { periods, cacheList } from '@utils/constants/statistics';
import * as URLS from '@utils/constants/urls';
import { getCurrencyName } from '@utils/appInfo';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';
import { translate } from '@utils/helpers/i18n';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';
import * as StatisticsStyles from '../Statistics.styles';
import { ITransformBlocksData } from '../BlockStatistics/BlockStatistics.helpers';

const BLOCK_ELEMENTS_COUNT = 8;

interface IIncomingTransactions {
  blockElements: ITransformBlocksData[];
}

const IncomingTransactions: React.FC<IIncomingTransactions> = ({ blockElements }) => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const incomingTransactionsData = useDeferredData<IHashRateResponse, TLineChartData>(
    {
      method: 'get',
      url: URLS.INCOMING_TRANSACTION_URL,
      params: { limit: BLOCK_ELEMENTS_COUNT, period },
    },
    transformChartData,
    undefined,
    undefined,
    [period, blockElements],
  );

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.incomingTransactions) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!incomingTransactionsData.isLoading && incomingTransactionsData.data) {
      const parseData = incomingTransactionsData.data;
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.incomingTransactions,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, incomingTransactionsData.isLoading]);

  const handleDropdownChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      setPeriod(event.target.value as PeriodTypes);
    }
  };

  return (
    <SummaryStyles.Card className="cascade-sense-card">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">
            {parse(
              translate('pages.statistics.incomingTransactions', { currency: getCurrencyName() }),
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
              showFieldset={false}
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
            <Skeleton animation="wave" variant="rectangular" height={300} />
            <StatisticsStyles.LoadingText>
              {parse(translate('common.loadingData'))}
            </StatisticsStyles.LoadingText>
          </>
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

export default IncomingTransactions;
