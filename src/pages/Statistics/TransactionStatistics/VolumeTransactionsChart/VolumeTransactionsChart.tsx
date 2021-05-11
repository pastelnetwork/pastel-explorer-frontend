import * as React from 'react';

import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

import LineChart from '@components/Charts/LineChart/LineChart';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formattedDate, getCurrentUnixTimestamp } from '@utils/helpers/date/date';

import { generateTitleWithZoomOptions } from '../../Statistics.helpers';
import { zoomOptions } from './VolumeTransactionsChart.helpers';
import {
  generateTransactionsData,
  sortTransactions,
  CHART_HEIGHT,
} from '../TransactionStatistics.helpers';

interface VolumeTransactionsProps {
  labels: Array<string>;
  data: Array<number>;
}

const VolumeTransactionsChart: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [zoomOption, setZoomOption] = React.useState(zoomOptions[0]);
  const [
    volumeTransactions,
    setVolumeTransactions,
  ] = React.useState<VolumeTransactionsProps | null>(null);
  const { fetchData } = useFetch<{ data: Array<[number, number]> }>({
    method: 'get',
    url: `${URLS.VOLUME_TRANSACTION_URL}?to=${getCurrentUnixTimestamp}&from=${
      getCurrentUnixTimestamp - zoomOption.timestampDifference
    }`,
  });

  const generateVolumeTransactionsData = (transactions: Array<[number, number]>) => {
    const sortedTransactions = sortTransactions(transactions);
    const groupedTransactions = sortedTransactions.reduce(
      (acc: VolumeTransactionsProps, [timestamp, value]) => {
        const date = formattedDate(timestamp, { onlyDayMonthYear: true });
        const sameDateIndex = acc.labels.findIndex(element => element === date);

        if (sameDateIndex > -1) {
          acc.data[sameDateIndex] += value;
        } else {
          acc.labels.push(date);
          acc.data.push(value);
        }

        return acc;
      },
      { labels: [], data: [] },
    );

    setVolumeTransactions(groupedTransactions);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then(response => {
        if (response?.data) {
          generateVolumeTransactionsData(response.data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [zoomOption]);

  return volumeTransactions ? (
    <Grid item>
      <LineChart
        title={generateTitleWithZoomOptions(
          zoomOptions,
          setZoomOption,
          `Volume of transactions (last ${zoomOption.tooltip})`,
        )}
        data={generateTransactionsData(volumeTransactions.labels, volumeTransactions.data)}
        isLoading={isLoading}
      />
    </Grid>
  ) : (
    <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />
  );
};

export default VolumeTransactionsChart;
