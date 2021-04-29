import * as React from 'react';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import subHours from 'date-fns/subHours';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import { CardHeader } from '@material-ui/core';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IHashRateResponse } from '@utils/types/IStatistics';
import { currentDate } from '@utils/helpers/date/date';

import * as Styles from './HashrateChart.styles';
import { chartVisualData, chartOptions } from './HashrateChart.options';

interface IChartData {
  labels: Array<string>;
  values: Array<number>;
}

const transformChartData = ({ data }: IHashRateResponse) => ({
  labels: data.map(time => format(fromUnixTime(time[0]), 'HH:mm')),
  values: data.map(value => Math.round((value[1] + Number.EPSILON) * 1000) / 1000),
});

const HashrateChart: React.FC = () => {
  const { fetchData } = useFetch<IHashRateResponse>({ method: 'get', url: URLS.HASHRATE_URL });
  const [chartData, setChartData] = React.useState<IChartData | null>(null);

  const fetchHashrateData = (from: number, to: number) =>
    fetchData({ params: { from, to } }).then(response => {
      if (!response) return null;

      return setChartData(transformChartData(response));
    });

  React.useEffect(() => {
    fetchHashrateData(getUnixTime(subHours(currentDate, 3)), getUnixTime(currentDate));
  }, []);

  const chartDataSet: ChartData = {
    labels: chartData?.labels,
    datasets: [
      {
        ...chartVisualData.datasets[0],
        data: chartData?.values || [],
        stepped: true,
      },
    ],
  };

  return (
    <Styles.Card p={5}>
      <CardHeader title="Network Hashrate GH/s (last 3 hours)" />
      <Line data={chartDataSet} options={chartOptions} type="line" />
    </Styles.Card>
  );
};

export default HashrateChart;
