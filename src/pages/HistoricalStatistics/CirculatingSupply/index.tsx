import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { PeriodTypes, transformStatisticsChart } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { TLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import { getCurrencyName } from '@utils/appInfo';
import useCirculatingSupply from '@hooks/useCirculatingSupply';
import { translate } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

import * as Styles from '../StatisticsOvertime.styles';

function CirculatingSupply() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useCirculatingSupply(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.circulatingSupply) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformStatisticsChart(swrData.data, period, '');
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.circulatingSupply,
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
        translate('pages.historicalStatistics.circulatingSupply', {
          currency: getCurrencyName(),
        }),
      )}
    >
      <EChartsLineChart
        chartName="circulatingSupply"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={parse(
          translate('pages.historicalStatistics.circulatingSupply', {
            currency: getCurrencyName(),
          }),
        )}
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

export default CirculatingSupply;

export function CirculatingSupplyChart() {
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[12][0]);
  const [isLoading, setLoading] = useState(false);
  const swrData = useCirculatingSupply(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.circulatingSupply) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as TLineChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformStatisticsChart(swrData.data, period, '');
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.circulatingSupply,
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
        chartName="circulatingSupplySmallChart"
        dataX={chartData?.dataX}
        dataY={chartData?.dataY}
        title={parse(
          translate('pages.historicalStatistics.circulatingSupply', {
            currency: getCurrencyName(),
          }),
        )}
        info={info}
        period={period}
        offset={0}
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
