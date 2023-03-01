import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PeriodTypes, transformMarketVolumePriceInfo } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TMultiLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import useMarketVolumePrice from '@hooks/useMarketVolumePrice';
import { getThemeState } from '@redux/reducers/appThemeReducer';

import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

function MarketVolumePrice() {
  const { darkMode } = useSelector(getThemeState);
  const [period, setPeriod] = useState<PeriodTypes>(periods[3][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();
  const [isLoading, setLoading] = useState(false);
  const swrData = useMarketVolumePrice(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.marketVolumePrice) || {};
    if (currentCache[period]) {
      setTransformLineChartData(currentCache[period].parseData as TMultiLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformMarketVolumePriceInfo(swrData.data, period);
      setTransformLineChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.marketVolumePrice,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, swrData.isLoading, swrData.data]);

  const handlePeriodFilterChange = (per: PeriodTypes) => {
    setPeriod(per);
  };

  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title="Market Price and Volume ($USD)"
    >
      <EChartsMultiLineChart
        chartName="marketVolumePrice"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        yaxisName="Price ($USD)"
        yaxisName1="Volume ($USD)"
        seriesName="Price"
        seriesName1="Vol 24h"
        fixedNum={5}
        fixedNum1={2}
        title="Market Price and Volume ($USD)"
        info={info}
        offset={0.0001}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
        color={[darkMode ? '#fff' : '#000', darkMode ? '#1fbfff' : '#5470c6']}
        symbol="$"
        symbol1="$"
      />
    </HistoricalStatisticsLayout>
  );
}

export default MarketVolumePrice;
