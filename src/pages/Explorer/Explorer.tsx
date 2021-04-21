import * as React from 'react';
import getTime from 'date-fns/getTime';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';
import Map, { MarkerProps } from '@components/Map/Map';
import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { currentDate, formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';
import { INetwork } from '@utils/types/INetwork';

import { mockChartTableData } from './Explorer.helpers';

const headers: Array<HeaderType> = [
  { id: 1, header: 'Block' },
  { id: 2, header: 'Hash' },
  { id: 3, header: 'Recipients' },
  { id: 4, header: 'Amount (PSL)' },
  { id: 5, header: 'Timestamp' },
];

const TRANSACTION_MIN_AMOUNT = '0.00000001';

const Explorer: React.FC = () => {
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps> | null>(null);
  const [geoLocationList, setGeoLocationList] = React.useState<Array<MarkerProps> | null>(null);
  const fetchTransactions = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: `${URLS.LAST_TRANSACTIONS_URL}/${TRANSACTION_MIN_AMOUNT}?_=${getTime(currentDate)}`,
  });
  const fetchGeoData = useFetch<{ data: Array<INetwork> }>({
    method: 'get',
    url: `${URLS.NETWORK_URL}`,
  });

  const transformTransactionsData = (transactions: Array<ITransaction>) => {
    const transformedTransactions = transactions.map(
      ({ vout, txid, blockindex, total, timestamp, blockhash }) => {
        return {
          id: txid,
          data: [
            {
              value: (
                <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockhash}`} value={blockindex} />
              ),
              id: 1,
            },
            {
              value: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${txid}`} value={txid} />,
              id: 2,
            },
            { value: vout.length, id: 3 },
            {
              value: formatNumber(total, { decimalsLength: 2, divideToAmount: true }),
              id: 4,
            },
            {
              value: formattedDate(timestamp),
              id: 5,
            },
          ],
        };
      },
    );

    setTransactionList(transformedTransactions);
  };

  const transformGeoLocationData = (geoLocations: Array<INetwork>) => {
    const transformedGeoLocations = geoLocations.map(({ latitude, longitude, country, city }) => {
      const latLng = [latitude, longitude] as [number, number];
      const name = city !== 'N/A' ? `${country} (${city})` : country;

      return {
        latLng,
        name,
      };
    });

    setGeoLocationList(transformedGeoLocations);
  };

  React.useEffect(() => {
    fetchGeoData.fetchData().then(response => {
      if (!response) return null;
      return transformGeoLocationData(response.data);
    });
    fetchTransactions.fetchData().then(response => {
      if (!response) return null;
      return transformTransactionsData(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Explorer" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Map markers={geoLocationList} title="Explorer Map" />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart
            title="Supernode Statistics"
            innerTitle="Total"
            innerSubtitle={formatNumber(3729, { decimalsLength: 0 })}
            data={mockChartTableData.data}
            table={<Table headers={mockChartTableData.headers} rows={mockChartTableData.rows} />}
          />
        </Grid>
      </Grid>
      <Grid item>
        <InfinityTable headers={headers} rows={transactionList} title="Latest Transactions" />
      </Grid>
    </>
  );
};

export default Explorer;
