// react
import { useEffect, useState } from 'react';

import { PeriodTypes, transformMempoolInfo } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import useMempoolSize from '@hooks/useMempoolSize';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

function MempoolSize() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [isLoading, setLoading] = useState(false);
  const swrData = useMempoolSize(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.mempoolSize) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformMempoolInfo(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.mempoolSize,
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
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Mempool Size">
      <EChartsLineChart
        chartName="mempoolsize"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title="Mempool Size(kB)"
        info={info}
        offset={1}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default MempoolSize;
