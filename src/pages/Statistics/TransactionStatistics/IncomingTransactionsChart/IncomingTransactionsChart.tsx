import * as React from 'react';
import format from 'date-fns/format';

import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

import LineChart from '@components/Charts/LineChart/LineChart';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';

import {
  generateTransactionsData,
  sortTransactions,
  CHART_HEIGHT,
} from '../TransactionStatistics.helpers';

interface IncomingTransactionsProps {
  labels: Array<string>;
  data: Array<number>;
}

const IncomingTransactionsChart: React.FC = () => {
  const [
    incomingTransactions,
    setIncomingTransactions,
  ] = React.useState<IncomingTransactionsProps | null>(null);
  const { fetchData } = useFetch<{ data: Array<[number, number]> }>({
    method: 'get',
    url: URLS.INCOMING_TRANSACTION_URL,
  });

  const generateIncomingTransactionsData = (transactions: Array<[number, number]>) => {
    const sortedTransactions = sortTransactions(transactions);
    const groupedTransactions = sortedTransactions.reduce(
      (acc: IncomingTransactionsProps, [timestamp, value]) => {
        const time = format(timestamp, 'HH:mm');

        acc.labels.push(time);
        acc.data.push(value);

        return acc;
      },
      { labels: [], data: [] },
    );

    setIncomingTransactions(groupedTransactions);
  };

  React.useEffect(() => {
    fetchData().then(response => {
      if (response?.data) {
        generateIncomingTransactionsData(response.data);
      }
    });
  }, []);

  return incomingTransactions ? (
    <Grid item>
      <LineChart
        title="Incoming transactions"
        data={generateTransactionsData(incomingTransactions.labels, incomingTransactions.data)}
      />
    </Grid>
  ) : (
    <Skeleton animation="wave" variant="rect" height={CHART_HEIGHT} />
  );
};

export default IncomingTransactionsChart;
