// react
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { PeriodTypes, transformNetTotals } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TMultiLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useNettotals from '@hooks/useNettotals';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function Nettotals() {
  const [chartData, setChartData] = useState<TMultiLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useNettotals(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.networkTotal) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TMultiLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformNetTotals(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.networkTotal,
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
      title={parse(translate('pages.historicalStatistics.networkTotal'))}
    >
      <EChartsLineChart
        chartName="networktotals"
        dataX={chartData?.dataX}
        dataY1={chartData?.dataY1}
        dataY2={chartData?.dataY2}
        title={parse(translate('pages.historicalStatistics.networkTotal'))}
        info={info}
        period={period}
        offset={0}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default Nettotals;
