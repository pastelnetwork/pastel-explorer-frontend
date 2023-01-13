import { useEffect, useState, ChangeEvent } from 'react';

import { PeriodTypes, transformHashRateCharts } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { THashrateChartData, TSolpsData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { Dropdown } from '@components/Dropdown/Dropdown';
import useHashRate from '@hooks/useHashRate';

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

function HashRate() {
  const [chartData, setChartData] = useState<THashrateChartData | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [period, setPeriod] = useState<PeriodTypes>(periods[1][0]);
  const [numberOfBlocks, setNumberOfBlocks] = useState<string>(options[0].value);
  const [isLoading, setLoading] = useState(false);
  const swrData = useHashRate(period);

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.hashRate) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as THashrateChartData);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!swrData.isLoading && swrData.data) {
      const parseData = transformHashRateCharts(swrData.data, period);
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.hashRate,
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
