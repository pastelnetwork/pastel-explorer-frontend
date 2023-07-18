import { useState, ChangeEvent, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import parse from 'html-react-parser';

import { PeriodTypes, generatePeriodToDropdownOptions } from '@utils/helpers/statisticsLib';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { periods, cacheList } from '@utils/constants/statistics';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import themeVariant from '@theme/variants';
import useTotalOfCascadeRequests from '@hooks/useTotalOfCascadeRequests';
import { translate } from '@utils/helpers/i18n';
import { TLineChartData } from '@utils/types/IStatistics';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as StatisticsStyles from '@pages/Statistics/Statistics.styles';

import { transformChartData } from './CascadeAndSenseStatistics.helpers';
import * as Styles from './CascadeAndSenseStatistics.styles';

const TotalOfCascadeRequests: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[7][2]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useTotalOfCascadeRequests(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.totalOfCascadeRequests) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformChartData(swrData.data);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.totalOfCascadeRequests,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, swrData.isLoading]);

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
    <SummaryStyles.Card className="cascade-sense-card total-of-cascade-requests">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">
            {parse(translate('pages.cascadeAndSenseStatistics.cascadeRequests'))}
          </SummaryStyles.Typography>
          <SummaryStyles.Typography variant="h4">
            <SummaryStyles.Values>
              {isLoading ? (
                <Skeleton animation="wave" variant="text" />
              ) : (
                <>
                  {formatNumber(swrData.currentValue)}{' '}
                  {swrData.currentValue > 1
                    ? parse(translate('pages.cascadeAndSenseStatistics.requests'))
                    : parse(translate('pages.cascadeAndSenseStatistics.request'))}
                </>
              )}
            </SummaryStyles.Values>
          </SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper>
          <Styles.Percentage>
            <Dropdown
              value={period}
              onChange={handleDropdownChange}
              options={generatePeriodToDropdownOptions(periods[7])}
              classNameWrapper="cascade-sense-statistics"
            />
            <br />
            <Styles.PercentageValue
              variant="subtitle2"
              mb={4}
              color="textSecondary"
              noWrap
              percentagecolor={`${
                swrData.difference > 0
                  ? themeVariant.custom.green.success
                  : themeVariant.custom.red.error
              }`}
            >
              <span>
                {`${swrData.difference > 0 ? '+' : ''}`}
                {swrData.difference}%&nbsp;
                {swrData.difference > 0 ? (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.23381 2.93331L1.08356 6.08356L4.37114e-07 5L5 4.37114e-07L10 5L8.91644 6.08356L5.76619 2.93331L5.76619 10L4.23381 10L4.23381 2.93331Z"
                      fill="#00D097"
                    />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.76619 7.06669L8.91644 3.91644L10 5L5 10L-2.18557e-07 5L1.08356 3.91644L4.23381 7.06669L4.23381 -2.52048e-07L5.76619 -1.85066e-07L5.76619 7.06669Z"
                      fill="#FF754C"
                    />
                  </svg>
                )}
              </span>
            </Styles.PercentageValue>
          </Styles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <Styles.ChartContentWrapper>
        {isLoading ? (
          <StatisticsStyles.Loader>
            <Skeleton animation="wave" variant="rect" height={170} width="100%" />
            <StatisticsStyles.LoadingText>
              {parse(translate('common.loadingData'))}
            </StatisticsStyles.LoadingText>
          </StatisticsStyles.Loader>
        ) : (
          <LineChart
            chartName="totalOfCascadeRequests"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={1}
            disableClick
            period={period}
          />
        )}
      </Styles.ChartContentWrapper>
    </SummaryStyles.Card>
  );
};

export default TotalOfCascadeRequests;
