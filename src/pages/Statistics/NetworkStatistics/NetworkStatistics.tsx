import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Header from '@components/Header/Header';
import { Skeleton } from '@material-ui/lab';

import { IHashRateResponse, TLineChartData } from '@utils/types/IStatistics';

import { PeriodTypes, transformChartData } from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';

const CHART_HEIGHT = 386;

const NetworkStatistics: React.FC = () => {
  const [period, setPeriod] = useState(periods[2][periods[2].length - 1]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const { fetchData } = useFetch<IHashRateResponse>({
    method: 'get',
    url: `${URLS.HASHRATE_URL}?period=${period}`,
  });
  const [chartData, setChartData] = useState<TLineChartData | null>(null);
  const fetchHashrateData = () => {
    setIsLoading(true);
    fetchData()
      .then(response => {
        if (!response) return null;
        const parseData = transformChartData(response);
        return setChartData(parseData);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    fetchHashrateData();
  }, [period]);
  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };
  return (
    <>
      <Header title="Network Statistics" />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {chartData || !isLoading ? (
            <div style={{ flex: 1, backgroundColor: currentBgColor }}>
              <EChartsLineChart
                chartName="averageblocksize"
                dataX={chartData?.dataX}
                dataY={chartData?.dataY}
                title="Hashrate GH/s"
                info={info}
                offset={1}
                periods={periods[2]}
                handleBgColorChange={handleBgColorChange}
                handlePeriodFilterChange={handlePeriodFilterChange}
              />
            </div>
          ) : (
            <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default NetworkStatistics;
