import { useEffect, useState } from 'react';

import { PeriodTypes, transformFeeSchedule } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { TLineChartData } from '@utils/types/IStatistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useFeeSchedule from '@hooks/useFeeSchedule';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

const FeeSchedule = () => {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[11][2]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useFeeSchedule(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.feeSchedule) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformFeeSchedule(swrData.data, period, '');
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.feeSchedule,
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
      title={translate('pages.historicalStatistics.feeSchedule')}
    >
      <EChartsLineChart
        chartName="feeSchedule"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={translate('pages.historicalStatistics.feeSchedule')}
        info={info}
        offset={100}
        period={period}
        periods={periods[11]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
};

export default FeeSchedule;
