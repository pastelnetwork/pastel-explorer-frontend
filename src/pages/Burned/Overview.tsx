import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';

import { LineChart } from '@components/Summary/LineChart';
import { RedReceived } from '@components/SvgIcon/Received';
import { translate } from '@utils/helpers/i18n';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { periods, cacheList } from '@utils/constants/statistics';
import { PeriodTypes } from '@utils/helpers/statisticsLib';
import { useBurnedByMonth, useSummary } from '@hooks/useBurned';
import {
  transformChartData,
  transformDirectionChartData,
} from '@pages/Details/AddressDetails/AddressDetails.helpers';
import { TLineChartData } from '@utils/types/IStatistics';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';

import * as TableStyles from '@components/Table/Table.styles';
import * as AddressDetailsStyles from '@pages/Details/AddressDetails/AddressDetails.styles';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import * as Styles from './Burned.styles';

const BurnedByMonth = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[10][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useBurnedByMonth(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.burnedByMonth) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformDirectionChartData(swrData.data);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.burnedByMonth,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, swrData.isLoading]);

  const getActivePeriodButtonStyle = (_period: string): string => {
    if (period === _period) {
      return 'active';
    }
    return '';
  };

  const handlePeriodChange = (_period: string) => {
    setPeriod(_period as PeriodTypes);
  };

  return (
    <AddressDetailsStyles.ChartItem>
      <Box>
        <AddressDetailsStyles.Heading className="direction-item">
          <AddressDetailsStyles.HeadingTitle>
            {parse(translate('pages.burned.burnedByMonth'))}
          </AddressDetailsStyles.HeadingTitle>
          <ChartStyles.PeriodSelect className="direction-period">
            <span>{parse(translate('pages.historicalStatistics.period'))}: </span>
            {periods[10].map(_period => (
              <ChartStyles.PeriodButton
                className={`${getActivePeriodButtonStyle(_period)} ${isLoading ? 'disable' : ''}`}
                onClick={() => handlePeriodChange(_period)}
                type="button"
                key={`burned-filter-${_period}`}
              >
                {_period}
              </ChartStyles.PeriodButton>
            ))}
          </ChartStyles.PeriodSelect>
        </AddressDetailsStyles.Heading>
      </Box>
      <Box className="chart-box">
        {isLoading ? (
          <AddressDetailsStyles.Loader>
            <CircularProgress size={40} />
            <AddressDetailsStyles.LoadingText>
              {parse(translate('common.loadingData'))}
            </AddressDetailsStyles.LoadingText>
          </AddressDetailsStyles.Loader>
        ) : (
          <LineChart
            chartName="directionIncoming"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={0}
            disableClick
            className="line-chart burned-by-month"
            seriesName="pages.burned.burnedByMonth"
            chartColor="#E94830"
          />
        )}
      </Box>
    </AddressDetailsStyles.ChartItem>
  );
};

const Summary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [totalBurned, setTotalBurned] = useState(0);
  const swrData = useSummary(selectedPeriod);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.totalPSLBurned) || {};
    if (currentCache[selectedPeriod]) {
      setChartData(currentCache[selectedPeriod].parseData as TLineChartData);
      setTotalBurned(currentCache[selectedPeriod]?.totalBurned || 0);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformChartData(swrData.data);
      setChartData(parseData);
      setTotalBurned(swrData?.totalBurned || 0);
      currentCache = {
        ...currentCache,
        [selectedPeriod]: {
          parseData,
          totalBurned: swrData?.totalBurned || 0,
        },
      };
      setCacheValue(
        cacheList.totalPSLBurned,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [selectedPeriod, swrData.isLoading]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setSelectedPeriod(value);
  };

  const getActivePeriodButtonStyle = (period: string): string => {
    if (selectedPeriod === period) {
      return 'active';
    }
    return '';
  };

  return (
    <div>
      <TableStyles.BlockWrapper className="address-wrapper">
        <TableStyles.StyledCard>
          <AddressDetailsStyles.Heading className="direction-item">
            <AddressDetailsStyles.HeadingTitle>
              {parse(translate('pages.burned.title', { currency: getCurrencyName() }))}
            </AddressDetailsStyles.HeadingTitle>
          </AddressDetailsStyles.Heading>

          <AddressDetailsStyles.ChartWrapper>
            <AddressDetailsStyles.BalanceHistoryWrapper>
              <AddressDetailsStyles.BalanceHistorySummaryWrapper>
                <AddressDetailsStyles.SummaryWrapper>
                  <AddressDetailsStyles.SummaryItem
                    className={`summary-item ${isLoading ? 'disable' : ''}`}
                  >
                    <AddressDetailsStyles.SummaryIcon className="received burn active">
                      <RedReceived />
                    </AddressDetailsStyles.SummaryIcon>
                    <AddressDetailsStyles.ItemWrapper>
                      <AddressDetailsStyles.SummaryLabel>
                        {parse(
                          translate(`pages.burned.totalBurned`, {
                            currency: getCurrencyName(),
                          }),
                        )}
                      </AddressDetailsStyles.SummaryLabel>
                      <AddressDetailsStyles.SummaryValue>
                        {isLoading ? (
                          <Skeleton animation="wave" variant="text" />
                        ) : (
                          formatNumber(totalBurned, { decimalsLength: 2 })
                        )}
                      </AddressDetailsStyles.SummaryValue>
                    </AddressDetailsStyles.ItemWrapper>
                  </AddressDetailsStyles.SummaryItem>
                </AddressDetailsStyles.SummaryWrapper>

                <ChartStyles.PeriodSelect className="period">
                  <span>{parse(translate('pages.historicalStatistics.period'))}: </span>
                  <div className="balance-history-period">
                    {periods[1].map(period => (
                      <ChartStyles.PeriodButton
                        className={`${getActivePeriodButtonStyle(period)} ${
                          isLoading ? 'disable' : ''
                        }`}
                        onClick={() => handlePeriodFilterChange(period)}
                        type="button"
                        key={`button-filter-${period}`}
                      >
                        {period}
                      </ChartStyles.PeriodButton>
                    ))}
                  </div>
                </ChartStyles.PeriodSelect>
              </AddressDetailsStyles.BalanceHistorySummaryWrapper>
            </AddressDetailsStyles.BalanceHistoryWrapper>
            <AddressDetailsStyles.ChartWrapper>
              {isLoading ? (
                <AddressDetailsStyles.Loader>
                  <CircularProgress size={40} />
                  <AddressDetailsStyles.LoadingText>
                    {parse(translate('common.loadingData'))}
                  </AddressDetailsStyles.LoadingText>
                </AddressDetailsStyles.Loader>
              ) : (
                <LineChart
                  chartName="totalBurned"
                  dataX={chartData?.dataX}
                  dataY={chartData?.dataY}
                  offset={0}
                  disableClick
                  className="line-chart"
                  period={selectedPeriod}
                  chartColor="#E94830"
                />
              )}
            </AddressDetailsStyles.ChartWrapper>
          </AddressDetailsStyles.ChartWrapper>
        </TableStyles.StyledCard>
      </TableStyles.BlockWrapper>
    </div>
  );
};

const Overview = () => {
  return (
    <Styles.OverviewWrapper>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={8}>
          <Summary />
        </Grid>
        <Grid item xs={12} lg={4}>
          <BurnedByMonth />
        </Grid>
      </Grid>
    </Styles.OverviewWrapper>
  );
};

export default Overview;
