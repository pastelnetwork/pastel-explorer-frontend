import * as React from 'react';
import getTime from 'date-fns/getTime';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';
import Map from '@components/Map/Map';
import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { currentDate, getDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import { mockMapMarkers, mockChartTableData } from './Explorer.helpers';

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
  const { fetchData } = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: `${URLS.LAST_TRANSACTIONS_URL}/${TRANSACTION_MIN_AMOUNT}?_=${getTime(currentDate)}`,
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
            { value: total / 100000000, id: 4 },
            {
              value: getDate(timestamp * 1000).toUTCString(),
              id: 5,
            },
          ],
        };
      },
    );

    setTransactionList(transformedTransactions);
  };

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response) return null;
      return transformTransactionsData(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Explorer" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Map markers={mockMapMarkers} title="Explorer Map" />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart
            title="Supernode Statistics"
            innerTitle="Total"
            innerSubtitle="3729"
            data={mockChartTableData.data}
            table={<Table headers={mockChartTableData.headers} rows={mockChartTableData.rows} />}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Table headers={headers} rows={transactionList} title="Latest Transactions" />
      </Grid>
    </>
  );
};

export default Explorer;
