import * as React from 'react';
import { ChartData } from 'chart.js';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

import { Skeleton } from '@material-ui/lab';

import LineChart from '@components/Charts/LineChart/LineChart';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IHashRateResponse } from '@utils/types/IStatistics';
import { getCurrentUnixTimestamp } from '@utils/helpers/date/date';

import * as Styles from './HashrateChart.styles';
import { chartVisualData } from './HashrateChart.options';
import { zoomOptions } from './HashrateChart.helpers';
import { generateZoomOptions } from '../Statistics.helpers';

interface IChartData {
  labels: Array<string>;
  values: Array<number>;
}

const CHART_HEIGHT = 386;

const transformChartData = ({ data }: IHashRateResponse) => ({
  labels: data.map(time => format(fromUnixTime(time[0]), 'HH:mm')),
  values: data.map(value => Math.round((value[1] + Number.EPSILON) * 1000) / 1000),
});

const HashrateChart: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [zoomOption, setZoomOption] = React.useState(zoomOptions[0]);
  const { fetchData } = useFetch<IHashRateResponse>({
    method: 'get',
    url: `${URLS.HASHRATE_URL}?to=${getCurrentUnixTimestamp}&from=${
      getCurrentUnixTimestamp - zoomOption.timestampDifference
    }`,
  });
  const [chartData, setChartData] = React.useState<IChartData | null>(null);

  const fetchHashrateData = () => {
    setIsLoading(true);
    fetchData()
      .then(response => {
        if (!response) return null;

        return setChartData(transformChartData(response));
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    fetchHashrateData();
  }, [zoomOption]);

  const chartDataSet: ChartData = {
    labels: chartData?.labels,
    datasets: [
      {
        ...chartVisualData.datasets[0],
        data: chartData?.values || [],
      },
    ],
  };

  return chartData ? (
    <Styles.Grid item>
      <LineChart
        data={chartDataSet}
        title={`Network Hashrate GH/s (last ${zoomOption.tooltip})`}
        isLoading={isLoading}
      />
      {generateZoomOptions(zoomOptions, setZoomOption)}
    </Styles.Grid>
  ) : (
    <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />
  );
};

export default HashrateChart;
