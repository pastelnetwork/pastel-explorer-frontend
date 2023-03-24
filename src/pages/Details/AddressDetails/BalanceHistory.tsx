import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { periods } from '@utils/constants/statistics';
import { translate } from '@utils/helpers/i18n';
import { LineChart } from '@components/Summary/LineChart';
import { PeriodTypes } from '@utils/helpers/statisticsLib';
import { useBalanceHistory } from '@hooks/useAddressDetails';
import { isPastelBurnAddress } from '@utils/appInfo';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import Summary from './Summary';
import { transformChartData } from './AddressDetails.helpers';
import * as Styles from './AddressDetails.styles';

interface IBalanceHistoryProps {
  id: string;
}

const BalanceHistory: React.FC<IBalanceHistoryProps> = ({ id }) => {
  const isBurnAddress = isPastelBurnAddress(id);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [selectedChartType, setSelectedChartType] = useState('balance');
  const { isLoading, balance, incoming, outgoing } = useBalanceHistory(id, selectedPeriod);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setSelectedPeriod(value);
  };

  const getActivePeriodButtonStyle = (index: string): string => {
    if (selectedPeriod === index) {
      return 'active';
    }
    return '';
  };

  const handleChangeTypeChange = (_value: string) => {
    setSelectedChartType(_value);
  };

  let chartData = transformChartData(balance);
  switch (selectedChartType) {
    case 'sent':
      chartData = transformChartData(outgoing);
      break;
    case 'received':
      chartData = transformChartData(incoming);
      break;
    default:
      break;
  }

  const getChartColor = () => {
    if (isBurnAddress) {
      return '#E94830';
    }

    switch (selectedChartType) {
      case 'sent':
        return '#E94830';
      case 'received':
        return '#219653';
      default:
        return '#5470c6';
    }
  };

  return (
    <Styles.BalanceHistoryWrapper>
      <Styles.BalanceHistorySummaryWrapper>
        <Summary
          id={id}
          onChange={handleChangeTypeChange}
          selectedChart={selectedChartType}
          isBalanceLoading={isLoading}
        />
        <ChartStyles.PeriodSelect className="period">
          <span>{translate('pages.historicalStatistics.period')}: </span>
          <div className="balance-history-period">
            {periods[1].map(period => (
              <ChartStyles.PeriodButton
                className={`${getActivePeriodButtonStyle(period)} ${isLoading ? 'disable' : ''}`}
                onClick={() => handlePeriodFilterChange(period)}
                type="button"
                key={`button-filter-${period}`}
              >
                {period}
              </ChartStyles.PeriodButton>
            ))}
          </div>
        </ChartStyles.PeriodSelect>
      </Styles.BalanceHistorySummaryWrapper>
      <Styles.ChartWrapper>
        {isLoading ? (
          <Styles.Loader>
            <CircularProgress size={40} />
            <Styles.LoadingText>{translate('common.loadingData')}</Styles.LoadingText>
          </Styles.Loader>
        ) : (
          <LineChart
            chartName="balanceHistory"
            dataX={chartData.dataX}
            dataY={chartData.dataY}
            offset={0}
            disableClick
            className="line-chart"
            period={selectedPeriod}
            seriesName={`pages.addressDetails.balanceHistory.${
              isBurnAddress && selectedChartType === 'received' ? 'totalBurned' : selectedChartType
            }`}
            chartColor={getChartColor()}
          />
        )}
      </Styles.ChartWrapper>
    </Styles.BalanceHistoryWrapper>
  );
};

export default BalanceHistory;
