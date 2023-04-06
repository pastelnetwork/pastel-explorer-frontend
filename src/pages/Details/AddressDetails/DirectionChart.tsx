import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LineChart } from '@components/Summary/LineChart';
import { useDirection } from '@hooks/useAddressDetails';
import { translate } from '@utils/helpers/i18n';
import { periods } from '@utils/constants/statistics';
import { PeriodTypes } from '@utils/helpers/statisticsLib';
import { isPastelBurnAddress } from '@utils/appInfo';
import { TLineChartData } from '@utils/types/IStatistics';
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
  title: string;
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
  const [period, setPeriod] = useState<PeriodTypes>(periods[10][0]);
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useDirection(id, period, direction);

  useEffect(() => {
    let currentCache = readCacheValue(cacheName) || {};
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
        cacheName,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, swrData.isLoading]);

  const handlePeriodChange = (_period: string) => {
    setPeriod(_period as PeriodTypes);
  };

  const getActivePeriodButtonStyle = (_period: string): string => {
    if (period === _period) {
      return 'active';
    }
    return '';
  };

  return (
    <Styles.ChartItem>
      <Box>
        <Styles.Heading className="direction-item">
          <Styles.HeadingTitle>{title}</Styles.HeadingTitle>
          <ChartStyles.PeriodSelect className="direction-period">
            <span>{translate('pages.historicalStatistics.period')}: </span>
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
        </Styles.Heading>
      </Box>
      <Box className="chart-box">
        {isLoading ? (
          <Styles.Loader>
            <CircularProgress size={40} />
            <Styles.LoadingText>{translate('common.loadingData')}</Styles.LoadingText>
          </Styles.Loader>
        ) : (
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
        )}
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
            title={translate(
              `pages.addressDetails.balanceHistory.${
                isBurnAddress ? 'burnedByMonth' : 'receivedByMonth'
              }`,
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
            title={translate('pages.addressDetails.balanceHistory.sentByMonth')}
          />
        </Grid>
      </Grid>
    </Styles.DirectionChartWrapper>
  );
};

export default DirectionChart;
