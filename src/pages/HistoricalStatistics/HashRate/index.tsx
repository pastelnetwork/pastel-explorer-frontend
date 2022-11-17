// react
import { useEffect, useState, ChangeEvent } from 'react';
import LRU from 'lru-cache';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformHashRateCharts } from '@utils/helpers/statisticsLib';
import { periods, info, LRU_OPTIONS, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { THashrate, THashrateChartData, TSolpsData, TCacheValue } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { Dropdown } from '@components/Dropdown/Dropdown';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

import * as Styles from './HashRate.styles';

const options = [
  {
    name: '5',
    value: '5',
  },
  {
    name: '10',
    value: '10',
  },
  {
    name: '25',
    value: '25',
  },
  {
    name: '50',
    value: '50',
  },
  {
    name: '100',
    value: '100',
  },
  {
    name: '500',
    value: '500',
  },
  {
    name: '1000',
    value: '1000',
  },
];

const cache = new LRU(LRU_OPTIONS);

function HashRate() {
  const [chartData, setChartData] = useState<THashrateChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [numberOfBlocks, setNumberOfBlocks] = useState<string>(options[0].value);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = useFetch<{ data: Array<THashrate> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_MINING_CHARTS,
  });

  useEffect(() => {
    let isSubscribed = true;
    const loadLineChartData = async () => {
      let currentCache =
        (cache.get(cacheList.hashRate) as TCacheValue) || readCacheValue(cacheList.hashRate) || {};
      if (!currentCache[period]) {
        setLoading(true);
      } else {
        setChartData(currentCache[period] as THashrateChartData);
      }
      const data = await fetchStats.fetchData({
        params: { period },
      });
      if (data) {
        const parseData = transformHashRateCharts(data.data, period);
        if (
          currentCache[period] &&
          JSON.stringify(parseData) !== JSON.stringify(currentCache[period])
        ) {
          setLoading(true);
        }
        if (isSubscribed) {
          setChartData(parseData);
        }
        if (!currentCache[period]) {
          currentCache = {
            ...currentCache,
            [period]: parseData,
          };
        }
        setCacheValue(
          cacheList.hashRate,
          JSON.stringify({
            currentCache,
            lastDate: Date.now(),
          }),
        );
        cache.set(cacheList.hashRate, currentCache);
      }
      setLoading(false);
    };
    loadLineChartData();
    return () => {
      isSubscribed = false;
    };
  }, [period]);

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  const handleDropdownChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    if (val) {
      setNumberOfBlocks(val);
    }
  };

  const renderNumberOfBlocks = () => {
    return (
      <Styles.DropdownWrapper>
        <Dropdown
          value={numberOfBlocks}
          onChange={handleDropdownChange}
          options={options}
          label="Number of blocks used in trailing average:"
          classNameWrapper="number-of-blocks"
        />
      </Styles.DropdownWrapper>
    );
  };
  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor} title="Hashrate">
      <EChartsLineChart
        chartName="hashrate"
        dataX={chartData?.dataX}
        dataY={chartData?.networksolps?.[`solps${numberOfBlocks}` as keyof TSolpsData]}
        title="Hashrate(MSol/S)"
        info={info}
        offset={10}
        period={period}
        periods={periods[6]}
        handleBgColorChange={handleBgColorChange}
        handlePeriodFilterChange={handlePeriodFilterChange}
        setHeaderBackground
        customHtml={renderNumberOfBlocks()}
        isLoading={isLoading}
      />
    </HistoricalStatisticsLayout>
  );
}

export default HashRate;
