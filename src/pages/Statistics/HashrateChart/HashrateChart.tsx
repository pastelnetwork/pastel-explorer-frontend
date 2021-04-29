import * as React from 'react';
import { ChartData } from 'chart.js';
import subHours from 'date-fns/subHours';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IHashRateResponse } from '@utils/types/IStatistics';
import { currentDate } from '@utils/helpers/date/date';
import LineChart from '@components/Charts/LineChart/LineChart';

import * as Styles from './HashrateChart.styles';
import { chartVisualData } from './HashrateChart.options';

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
      },
    ],
  };

  return (
    <Styles.Card p={5}>
      <LineChart data={chartDataSet} title="Network Hashrate GH/s (last 3 hours)" />
    </Styles.Card>
  );
};

export default HashrateChart;
