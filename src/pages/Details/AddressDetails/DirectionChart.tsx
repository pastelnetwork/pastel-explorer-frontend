import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LineChart } from '@components/Summary/LineChart';
import { useDirection } from '@hooks/useAddressDetails';
import { translate } from '@utils/helpers/i18n';
import { periods } from '@utils/constants/statistics';
import { PeriodTypes } from '@utils/helpers/statisticsLib';

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
}

const DirectionItem: React.FC<IDirectionItemProps> = ({ id, direction, chartName, title }) => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[10][0]);
  const { data, isLoading } = useDirection(id, period, direction);

  const handlePeriodChange = (_period: string) => {
    setPeriod(_period as PeriodTypes);
  };

  const getActivePeriodButtonStyle = (_period: string): string => {
    if (period === _period) {
      return 'active';
    }
    return '';
  };
  const chartData = transformDirectionChartData(data);

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
            dataX={chartData.dataX}
            dataY={chartData.dataY}
            offset={0}
            disableClick
            className="line-chart"
          />
        )}
      </Box>
    </Styles.ChartItem>
  );
};

const DirectionChart: React.FC<IDirectionChartProps> = ({ id }) => {
  return (
    <Styles.DirectionChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DirectionItem
            id={id}
            direction="Incoming"
            chartName="directionIncoming"
            title={translate('pages.addressDetails.balanceHistory.receivedByMonth')}
          />
        </Grid>
        <Grid item xs={12}>
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
