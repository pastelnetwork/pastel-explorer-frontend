import * as React from 'react';

import { Skeleton } from '@material-ui/lab';
import { Tooltip, Typography } from '@material-ui/core';

import LineChart from '@components/Charts/LineChart/LineChart';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formattedDate, getCurrentUnixTimestamp } from '@utils/helpers/date/date';

import {
  generateVolumeOfTransactionsData,
  zoomOptions,
  TimestampDifference,
} from './VolumeTransactionsChart.helpers';
import * as Styles from './VolumeTransactionsChart.styles';

interface VolumeTransactionsProps {
  labels: Array<string>;
  data: Array<number>;
}

const VolumeTransactionsChart: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [zoomTimeDifference, setZoomTimeDifference] = React.useState(TimestampDifference['1m']);
  const [
    volumeTransactions,
    setVolumeTransactions,
  ] = React.useState<VolumeTransactionsProps | null>(null);
  const { fetchData } = useFetch<{ data: Array<[number, number]> }>({
    method: 'get',
    url: `${URLS.VOLUME_TRANSACTION_URL}?to=${getCurrentUnixTimestamp}&from=${
      getCurrentUnixTimestamp - zoomTimeDifference
    }`,
  });

  const sortTransactions = (transactions: Array<[number, number]>) => {
    return transactions.sort(([valueA], [valueB]) => {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  };

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
    fetchData().then(response => {
      if (response?.data) {
        generateVolumeTransactionsData(response.data);
        setIsLoading(false);
      }
    });
  }, [zoomTimeDifference]);

  return volumeTransactions ? (
    <Styles.Grid item>
      <LineChart
        title={
          isLoading ? (
            <Skeleton animation="wave" variant="rect" />
          ) : (
            `Volume of transactions (${TimestampDifference[zoomTimeDifference]})`
          )
        }
        data={generateVolumeOfTransactionsData(volumeTransactions.labels, volumeTransactions.data)}
      />
      {/**
       * Revert ZoomContainer display none to see zoom options and customize it to get required space after legend removal
       */}
      <Styles.ZoomContainer>
        <Typography variant="caption">Zoom</Typography>
        {zoomOptions.map(({ name, tooltip, timestampDifference }) => (
          <Tooltip key={name} title={tooltip} arrow>
            <Styles.ZoomElement onClick={() => setZoomTimeDifference(timestampDifference)}>
              {name}
            </Styles.ZoomElement>
          </Tooltip>
        ))}
      </Styles.ZoomContainer>
    </Styles.Grid>
  ) : (
    <Skeleton animation="wave" variant="rect" />
  );
};

export default VolumeTransactionsChart;
