import { useState, useEffect, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { subMonths, format } from 'date-fns';
import parse from 'html-react-parser';

import { LineChart } from '@components/Summary/LineChart';
import { useDirection } from '@hooks/useAddressDetails';
import { translate } from '@utils/helpers/i18n';
import { periods } from '@utils/constants/statistics';
import {
  PeriodTypes,
  marketPeriodByMonthData,
  TPeriodByMonthDataTypes,
} from '@utils/helpers/statisticsLib';
import { isPastelBurnAddress } from '@utils/appInfo';
import { TLineChartData, TChartStatisticsResponse } from '@utils/types/IStatistics';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';

import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import { transformDirectionChartData } from './AddressDetails.helpers';
import * as Styles from './AddressDetails.styles';

interface IDirectionChartProps {
  id: string;
}

interface IDirectionItemProps {
  id: string;
  direction: string;
  chartName: string;
  title: ReactNode;
  seriesName?: string;
  chartColor?: string;
}

const DirectionItem: React.FC<IDirectionItemProps> = ({
  id,
  direction,
  chartName,
  title,
  seriesName,
  chartColor,
}) => {
  const cacheName = `explorer${direction}${id}`;
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodTypes>(periods[10][0]);
  const [period, setPeriod] = useState<PeriodTypes>(periods[10][2]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useDirection(id, period, direction);

  const getBalanceHistoryData = (
    value: TPeriodByMonthDataTypes,
    directionData: TChartStatisticsResponse[],
  ): TChartStatisticsResponse[] => {
    if (directionData.length) {
      const duration = marketPeriodByMonthData[value] ?? 0;
      const target = subMonths(new Date(), duration).valueOf();
      if (value !== periods[10][2]) {
        const data = directionData.filter(b => b.time >= target);
        const result = [];
        for (let i = duration - 1; i >= 0; i -= 1) {
          const date = subMonths(new Date(), i);
          const item = data.find(d => format(d.time, 'yyyyMM') === format(date, 'yyyyMM'));
          if (!item) {
            result.push({
              time: date.valueOf(),
              value: 0,
            });
          } else {
            result.push({
              time: item.time,
              value: item.value,
            });
          }
        }
        return result;
      }
      return directionData;
    }

    return [];
  };

  useEffect(() => {
    let currentCache = readCacheValue(cacheName) || {};
    if (currentCache[selectedPeriod]) {
      setChartData(currentCache[selectedPeriod].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(swrData.isLoading);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformDirectionChartData(
        getBalanceHistoryData(selectedPeriod as TPeriodByMonthDataTypes, swrData.data),
      );
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [selectedPeriod]: {
          parseData,
        },
      };
      setCacheValue(
        cacheName,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [selectedPeriod, swrData.isLoading]);

  const handlePeriodChange = (_period: string) => {
    setSelectedPeriod(_period as PeriodTypes);
    if (!period) {
      setPeriod(_period as PeriodTypes);
    }
    const parseData = transformDirectionChartData(
      getBalanceHistoryData(_period as TPeriodByMonthDataTypes, swrData.data),
    );
    setChartData(parseData);
  };

  const getActivePeriodButtonStyle = (_period: string): string => {
    if (selectedPeriod === _period) {
      return 'active';
    }
    return '';
  };

  return (
    <Styles.ChartItem>
      <Box>
        <Styles.Heading className="direction-item">
          <Styles.HeadingTitle>{title}</Styles.HeadingTitle>
          {chartData?.dataX?.length ? (
            <ChartStyles.PeriodSelect className="direction-period">
              <span>{parse(translate('pages.historicalStatistics.period'))}: </span>
              {periods[10].map(_period => (
                <ChartStyles.PeriodButton
                  className={`${getActivePeriodButtonStyle(_period)} ${isLoading ? 'disable' : ''}`}
                  onClick={() => handlePeriodChange(_period)}
                  type="button"
                  key={`${chartName}-filter-${_period}`}
                >
                  {_period}
                </ChartStyles.PeriodButton>
              ))}
            </ChartStyles.PeriodSelect>
          ) : null}
        </Styles.Heading>
      </Box>
      <Box className="chart-box">
        {isLoading ? (
          <Styles.Loader>
            <CircularProgress size={40} />
            <Styles.LoadingText>{parse(translate('common.loadingData'))}</Styles.LoadingText>
          </Styles.Loader>
        ) : null}
        {!isLoading && chartData?.dataX?.length ? (
          <LineChart
            chartName={chartName}
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={0}
            disableClick
            className="line-chart"
            seriesName={seriesName}
            chartColor={chartColor}
          />
        ) : null}
        {!isLoading && !chartData?.dataX?.length ? (
          <Styles.NoData sx={{ minHeight: '260px' }}>
            {parse(translate('common.noData'))}
          </Styles.NoData>
        ) : null}
      </Box>
    </Styles.ChartItem>
  );
};

const DirectionChart: React.FC<IDirectionChartProps> = ({ id }) => {
  const isBurnAddress = isPastelBurnAddress(id);
  return (
    <Styles.DirectionChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={12}>
          <DirectionItem
            id={id}
            direction="Incoming"
            chartName="directionIncoming"
            title={parse(
              translate(
                `pages.addressDetails.balanceHistory.${
                  isBurnAddress ? 'burnedByMonth' : 'receivedByMonth'
                }`,
              ),
            )}
            seriesName={`pages.addressDetails.balanceHistory.${
              isBurnAddress ? 'burnedByMonth' : 'receivedByMonth'
            }`}
            chartColor={isBurnAddress ? '#E94830' : undefined}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <DirectionItem
            id={id}
            direction="Outgoing"
            chartName="directionOutgoing"
            title={parse(translate('pages.addressDetails.balanceHistory.sentByMonth'))}
          />
        </Grid>
      </Grid>
    </Styles.DirectionChartWrapper>
  );
};

export default DirectionChart;
