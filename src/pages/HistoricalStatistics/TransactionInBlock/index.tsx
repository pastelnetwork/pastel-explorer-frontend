import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { PeriodTypes, transformBlocks } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TScatterChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useTransactionInBlock from '@hooks/useTransactionInBlock';
import { translate } from '@utils/helpers/i18n';

import { EChartsScatterChart } from '../Chart/EChartsScatterChart';

function TransactionInBlock() {
  const [chartData, setChartData] = useState<TScatterChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][periods[2].length - 1]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useTransactionInBlock(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.transactionInBlock) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TScatterChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformBlocks(swrData.data);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.transactionInBlock,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, swrData.isLoading, swrData.data]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title={parse(translate('pages.historicalStatistics.transactionsInBlock'))}
    >
      <EChartsScatterChart
        chartName="transactionsinblock"
        data={chartData?.data}
        dataX={chartData?.dataX}
        title={parse(translate('pages.historicalStatistics.transactionsInBlock'))}
        info={info}
        offset={1}
        period={period}
        periods={periods[2]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default TransactionInBlock;
