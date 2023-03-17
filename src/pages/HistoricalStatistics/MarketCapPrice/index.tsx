import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PeriodTypes, transformMarketCapPriceInfo } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TMultiLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import useMarketCapPrice from '@hooks/useMarketCapPrice';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { translate } from '@utils/helpers/i18n';

import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

function MarketCapPrice() {
  const { darkMode } = useSelector(getThemeState);
  const [period, setPeriod] = useState<PeriodTypes>(periods[3][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [isLoading, setLoading] = useState(false);
  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();

  const swrData = useMarketCapPrice(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.marketCapPrice) || {};
    if (currentCache[period]) {
      setTransformLineChartData(currentCache[period].parseData as TMultiLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformMarketCapPriceInfo(swrData.data, period);
      setTransformLineChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.marketCapPrice,
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
      title={translate('pages.historicalStatistics.marketPriceAndCircCap')}
    >
      <EChartsMultiLineChart
        chartName="marketCapPrice"
        dataX={transformLineChartData?.dataX}
        dataY1={transformLineChartData?.dataY1}
        dataY2={transformLineChartData?.dataY2}
        yaxisName={translate('pages.historicalStatistics.priceUSD')}
        yaxisName1={translate('pages.historicalStatistics.circCapUSD')}
        seriesName={translate('pages.historicalStatistics.price')}
        seriesName1={translate('pages.historicalStatistics.marketCap')}
        fixedNum={5}
        fixedNum1={2}
        title={translate('pages.historicalStatistics.marketPriceAndCircCap')}
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

export default MarketCapPrice;
