import { useEffect, useState, ChangeEvent } from 'react';
import parse from 'html-react-parser';

import { PeriodTypes, transformHashRateCharts } from '@utils/helpers/statisticsLib';
import { periods, info, cacheList } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';
import { THashrateChartData, TSolpsData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout/HistoricalStatisticsLayout';
import { Dropdown } from '@components/Dropdown/Dropdown';
import useHashRate from '@hooks/useHashRate';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import { EChartsLineChart } from '../Chart/EChartsLineChart';

import * as Styles from './HashRate.styles';

function HashRate() {
  const options = [
    {
      name: translateDropdown('pages.historicalStatistics.hashRate5'),
      value: '5',
    },
    {
      name: translateDropdown('pages.historicalStatistics.hashRate10'),
      value: '10',
    },
    {
      name: translateDropdown('pages.historicalStatistics.hashRate25'),
      value: '25',
    },
    {
      name: translateDropdown('pages.historicalStatistics.hashRate50'),
      value: '50',
    },
    {
      name: translateDropdown('pages.historicalStatistics.hashRate100'),
      value: '100',
    },
    {
      name: translateDropdown('pages.historicalStatistics.hashRate500'),
      value: '500',
    },
    {
      name: translateDropdown('pages.historicalStatistics.hashRate1000'),
      value: '1000',
    },
  ];

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
          label={translateDropdown('pages.historicalStatistics.numberOfBlocks')}
          classNameWrapper="number-of-blocks"
        />
      </Styles.DropdownWrapper>
    );
  };
  return (
    <HistoricalStatisticsLayout
      currentBgColor={currentBgColor}
      title={parse(translate('pages.historicalStatistics.hashrate'))}
    >
      <EChartsLineChart
        chartName="hashrate"
        dataX={chartData?.dataX}
        dataY={chartData?.networksolps?.[`solps${numberOfBlocks}` as keyof TSolpsData]}
        title={parse(translate('pages.historicalStatistics.hashrateMSolS'))}
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
