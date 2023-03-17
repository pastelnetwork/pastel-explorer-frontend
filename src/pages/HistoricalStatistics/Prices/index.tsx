// react
import { useEffect, useState } from 'react';
// application
import { getCurrencyName } from '@utils/appInfo';
import { PeriodTypes, transformPriceInfo } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TMultiLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import usePriceOvertime from '@hooks/usePriceOvertime';
import { translate } from '@utils/helpers/i18n';

import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

function PriceOvertime() {
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [isLoading, setLoading] = useState(false);
  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();
  const swrData = usePriceOvertime(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.priceOvertime) || {};
    if (currentCache[period]) {
      setTransformLineChartData(currentCache[period].parseData as TMultiLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformPriceInfo(swrData.data, period);
      setTransformLineChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.priceOvertime,
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
      title={translate('pages.historicalStatistics.prices', { currency: getCurrencyName() })}
    >
      <EChartsMultiLineChart
        chartName="prices"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        title={translate('pages.historicalStatistics.prices', { currency: getCurrencyName() })}
        info={info}
        offset={0.0001}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        seriesName1Type="line"
        isLoading={isLoading}
        showLegend
      />
    </HistoricalStatisticsLayout>
  );
}

export default PriceOvertime;
