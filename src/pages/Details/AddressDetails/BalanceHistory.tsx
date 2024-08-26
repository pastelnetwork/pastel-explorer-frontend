import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { subDays, format } from 'date-fns';
import parse from 'html-react-parser';

import { periods } from '@utils/constants/statistics';
import { translate } from '@utils/helpers/i18n';
import { LineChart } from '@components/Summary/LineChart';
import { PeriodTypes, TPeriodDataTypes, marketPeriodData } from '@utils/helpers/statisticsLib';
import { useBalanceHistory, TBalanceHistory } from '@hooks/useAddressDetails';
import { isPastelBurnAddress } from '@utils/appInfo';
import { TChartStatisticsResponse, TLineChartData } from '@utils/types/IStatistics';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import Summary from './Summary';
import { transformChartData } from './AddressDetails.helpers';
import * as Styles from './AddressDetails.styles';

interface IBalanceHistoryProps {
  id: string;
}

const BalanceHistory: React.FC<IBalanceHistoryProps> = ({ id }) => {
  const cacheName = `explorerBalanceHistory${id}`;
  const isBurnAddress = isPastelBurnAddress(id);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodTypes>(periods[1][4]);
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][4]);
  const [selectedChartType, setSelectedChartType] = useState('balance');
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const swrData = useBalanceHistory(id);

  const getBalanceHistoryData = (
    value: TPeriodDataTypes,
    chartType: string,
    balanceHistory: TBalanceHistory,
  ): TChartStatisticsResponse[] => {
    if (balanceHistory.balance) {
      const balanceHistoryData = balanceHistory[
        chartType as keyof TBalanceHistory
      ] as TChartStatisticsResponse[];
      const duration = marketPeriodData[value] ?? 0;
      const target = subDays(new Date(), duration).valueOf();
      const startBalanceHistoryData = balanceHistoryData.filter(b => b.time < target);
      let startBalance = startBalanceHistoryData.length
        ? startBalanceHistoryData[startBalanceHistoryData.length - 1].value
        : 0;
      if (value !== periods[1][4]) {
        const data = balanceHistoryData.filter(b => b.time >= target);
        if (chartType === 'balance') {
          const result = [];
          for (let i = duration - 1; i >= 0; i -= 1) {
            const date = subDays(new Date(), i);
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
          return result;
        }
        if (data.length) {
          return data;
        }
        return [{ value: startBalance, time: target }];
      }
      return balanceHistory[chartType as keyof TBalanceHistory];
    }

    return [];
  };

  useEffect(() => {
    let currentCache = readCacheValue(cacheName) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformChartData(
        getBalanceHistoryData(selectedPeriod as TPeriodDataTypes, selectedChartType, swrData.data),
      );
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

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setSelectedPeriod(value);
    if (!period) {
      setPeriod(value);
    }
    const parseData = transformChartData(
      getBalanceHistoryData(value as TPeriodDataTypes, selectedChartType, swrData.data),
    );
    setChartData(parseData);
  };

  const getActivePeriodButtonStyle = (index: string): string => {
    if (selectedPeriod === index) {
      return 'active';
    }
    return '';
  };

  const handleChangeTypeChange = (_value: string) => {
    setSelectedChartType(_value);
    const parseData = transformChartData(
      getBalanceHistoryData(selectedPeriod as TPeriodDataTypes, _value, swrData.data),
    );
    setChartData(parseData);
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
          isBalanceLoading={isLoading || swrData.isLoading}
          outgoingSum={swrData?.data?.totalSent}
          incomingSum={swrData?.data?.totalReceived}
        />
        {chartData?.dataX?.length ? (
          <ChartStyles.PeriodSelect className="period">
            <span>{parse(translate('pages.historicalStatistics.period'))}: </span>
            <div className="balance-history-period">
              {periods[1].map(_period => (
                <ChartStyles.PeriodButton
                  className={`${getActivePeriodButtonStyle(_period)} ${
                    isLoading || swrData.isLoading ? 'disable' : ''
                  }`}
                  onClick={() => handlePeriodFilterChange(_period)}
                  type="button"
                  key={`button-filter-${_period}`}
                >
                  {_period}
                </ChartStyles.PeriodButton>
              ))}
            </div>
          </ChartStyles.PeriodSelect>
        ) : null}
      </Styles.BalanceHistorySummaryWrapper>
      <Styles.ChartWrapper>
        {isLoading || swrData.isLoading ? (
          <Styles.Loader>
            <CircularProgress size={40} />
            <Styles.LoadingText>{parse(translate('common.loadingData'))}</Styles.LoadingText>
          </Styles.Loader>
        ) : (
          <>
            {chartData?.dataX?.length ? (
              <LineChart
                chartName="balanceHistory"
                dataX={chartData?.dataX}
                dataY={chartData?.dataY}
                offset={0}
                disableClick
                className="line-chart"
                period={selectedPeriod}
                seriesName={`pages.addressDetails.balanceHistory.${
                  isBurnAddress && selectedChartType === 'received'
                    ? 'totalBurned'
                    : selectedChartType
                }`}
                chartColor={getChartColor()}
              />
            ) : (
              <Styles.NoData sx={{ minHeight: '266px' }}>
                {parse(translate('common.noData'))}
              </Styles.NoData>
            )}
          </>
        )}
      </Styles.ChartWrapper>
    </Styles.BalanceHistoryWrapper>
  );
};

export default BalanceHistory;
