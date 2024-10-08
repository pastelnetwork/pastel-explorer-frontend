import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { PeriodTypes, transformTotalSupplyDataChart } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import { getCurrencyName } from '@utils/appInfo';
import useTotalSupply from '@hooks/useTotalSupply';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';
import * as Styles from '../StatisticsOvertime.styles';

function TotalSupply() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[6][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useTotalSupply(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.totalSupply) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformTotalSupplyDataChart(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.totalSupply,
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
      title={parse(
        translate('pages.historicalStatistics.totalSupply', { currency: getCurrencyName() }),
      )}
    >
      <EChartsLineChart
        chartName="totalSupply"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={parse(
          translate('pages.historicalStatistics.totalSupply', { currency: getCurrencyName() }),
        )}
        info={info}
        period={period}
        offset={10000000}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default TotalSupply;

export function TotalSupplyChart() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[12][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useTotalSupply(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.totalSupply) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformTotalSupplyDataChart(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.totalSupply,
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
    <Styles.SmallChartWrapper style={{ backgroundColor: currentBgColor }}>
      <EChartsLineChart
        chartName="totalSupplySmallChart"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={parse(
          translate('pages.historicalStatistics.totalSupply', { currency: getCurrencyName() }),
        )}
        info={info}
        period={period}
        offset={10000000}
        periods={periods[12]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        isLoading={isLoading}
        hideChangeColor
        hideDownloadButton
      />
    </Styles.SmallChartWrapper>
  );
}
