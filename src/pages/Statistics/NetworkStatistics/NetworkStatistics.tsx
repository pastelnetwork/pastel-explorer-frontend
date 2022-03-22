import { useState } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

import { TMiningInfo, TLineChartData } from '@utils/types/IStatistics';

import { PeriodTypes, transformHashrateInfo } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';

import * as Styles from '../Statistics.styles';

const NetworkStatistics: React.FC = () => {
  const [period, setPeriod] = useState(periods[2][periods[2].length - 1]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();

  const { isLoading, data: chartData } = useDeferredData<{ data: TMiningInfo[] }, TLineChartData>(
    { method: 'get', url: `${URLS.GET_STATISTICS_HASHRATE}?period=${period}` },
    ({ data }) => transformHashrateInfo(data),
    undefined,
    undefined,
    [period],
  );

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };
  return (
    <Styles.BlockWrapper>
      <Styles.BlockTitle>Network Statistics</Styles.BlockTitle>
      <Grid container>
        <Grid item xs={12}>
          {chartData || !isLoading ? (
            <div style={{ flex: 1, backgroundColor: currentBgColor }}>
              <EChartsLineChart
                chartName="averageblocksize"
                dataX={chartData?.dataX}
                dataY={chartData?.dataY}
                title="Hashrate MH/s"
                period={period}
                info={info}
                offset={1}
                periods={periods[2]}
                handleBgColorChange={handleBgColorChange}
                handlePeriodFilterChange={handlePeriodFilterChange}
              />
            </div>
          ) : (
            <Styles.Loader>
              <CircularProgress size={40} />
            </Styles.Loader>
          )}
        </Grid>
      </Grid>
    </Styles.BlockWrapper>
  );
};

export default NetworkStatistics;
