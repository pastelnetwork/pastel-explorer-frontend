import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';

import { periods } from '@utils/constants/statistics';
import { translate } from '@utils/helpers/i18n';
import { LineChart } from '@components/Summary/LineChart';
import { PeriodTypes, TPeriodDataTypes, marketPeriodData } from '@utils/helpers/statisticsLib';
import { useBalanceHistory } from '@hooks/useAddressDetails';
import { isPastelBurnAddress } from '@utils/appInfo';
import { TChartStatisticsResponse } from '@utils/types/IStatistics';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import Summary from './Summary';
import { transformChartData } from './AddressDetails.helpers';
import * as Styles from './AddressDetails.styles';

interface IBalanceHistoryProps {
  id: string;
}

const BalanceHistory: React.FC<IBalanceHistoryProps> = ({ id }) => {
  const isBurnAddress = isPastelBurnAddress(id);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodTypes>(periods[1][4]);
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][4]);
  const [selectedChartType, setSelectedChartType] = useState('balance');
  const [chartData, setChartData] = useState<{ dataX: string[]; dataY: number[] }>({
    dataX: [],
    dataY: [],
  });
  const { isLoading, balance } = useBalanceHistory(id, period);

  const getBalanceHistoryData = (value: TPeriodDataTypes, chartType: string) => {
    const sessionStorageBalanceHistory = window.localStorage.getItem(`explorer${id}`);
    if (sessionStorageBalanceHistory) {
      const balanceHistory = JSON.parse(sessionStorageBalanceHistory);
      if (value !== periods[1][4]) {
        const duration = marketPeriodData[value] ?? 0;
        const target = subDays(new Date(), duration).valueOf();
        const balanceHistoryData = balanceHistory[chartType] as TChartStatisticsResponse[];
        const data = balanceHistoryData.filter(b => b.time >= target);
        const result = [];
        let startBalance = 0;
        if (!data.length) {
          startBalance = balanceHistoryData[balanceHistoryData.length - 1].value;
        } else {
          startBalance = data[0].value;
        }
        for (let i = duration - 1; i >= 0; i -= 1) {
          const date = subDays(new Date(), duration);
          const item = data.find(d => format(d.time, 'yyyyMMdd') === format(date, 'yyyyMMdd'));
          if (!item) {
            result.push({
              time: date.valueOf(),
              value: startBalance,
            });
          } else {
            result.push({
              time: item.time,
              value: item.value,
            });
            startBalance = item.value;
          }
        }
        setChartData(transformChartData(result));
      } else {
        setChartData(transformChartData(balanceHistory[chartType]));
      }
    }

    return [];
  };

  useEffect(() => {
    getBalanceHistoryData(selectedPeriod as TPeriodDataTypes, selectedChartType);
  }, []);

  useEffect(() => {
    if (!isLoading && balance.length) {
      getBalanceHistoryData(selectedPeriod as TPeriodDataTypes, selectedChartType);
    }
  }, [isLoading]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setSelectedPeriod(value);
    if (!period) {
      setPeriod(value);
    }
    getBalanceHistoryData(value as TPeriodDataTypes, selectedChartType);
  };

  const getActivePeriodButtonStyle = (index: string): string => {
    if (selectedPeriod === index) {
      return 'active';
    }
    return '';
  };

  const handleChangeTypeChange = (_value: string) => {
    setSelectedChartType(_value);
    getBalanceHistoryData(selectedPeriod as TPeriodDataTypes, _value);
  };

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
            {periods[1].map(_period => (
              <ChartStyles.PeriodButton
                className={`${getActivePeriodButtonStyle(_period)} ${isLoading ? 'disable' : ''}`}
                onClick={() => handlePeriodFilterChange(_period)}
                type="button"
                key={`button-filter-${_period}`}
              >
                {_period}
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
