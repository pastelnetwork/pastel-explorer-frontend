import * as React from 'react';
import getTime from 'date-fns/getTime';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';
import Map from '@components/Map/Map';
import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';
import LineChart from '@components/Charts/LineChart/LineChart';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { currentDate, formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import { mockMapMarkers, mockChartTableData, generateChartData } from './Explorer.helpers';

const headers: Array<HeaderType> = [
  { id: 1, header: 'Block' },
  { id: 2, header: 'Hash' },
  { id: 3, header: 'Recipients' },
  { id: 4, header: 'Amount (PSL)' },
  { id: 5, header: 'Timestamp' },
];

interface ChartProps {
  labels: Array<string>;
  transactionData: Array<number | null>;
  blockData: Array<number | null>;
}

const TRANSACTION_MIN_AMOUNT = '0.00000001';
const TRANSACTION_CALL_TIMEOUT = 1000;

const Explorer: React.FC = () => {
  const [chartData, setChartData] = React.useState<ChartProps>({
    labels: [],
    transactionData: [],
    blockData: [],
  });
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

  // eslint-disable-next-line no-unused-vars
  const transformChartData = (transactions: Array<ITransaction>) => {
    // const lastTransactions = transactions.slice(-10);
    // const labels: ChartProps['labels'] = [];
    // const transactionData: ChartProps['transactionData'] = [];
    // const blockData: ChartProps['blockData'] = [];

    // lastTransactions.forEach(transactionElement => {
    //   labels.push(new Date(transactionElement.timestamp).toLocaleTimeString());
    //   // transactionData.push(
    //   //   parseFloat(
    //   //     formatNumber(transactionElement.total, { decimalsLength: 2, divideToAmount: true }),
    //   //   ),
    //   // );
    //   // blockData.push(
    //   //   parseFloat(
    //   //     formatNumber(transactionElement.total, { decimalsLength: 2, divideToAmount: true }),
    //   //   ),
    //   // );
    //   transactionData.push(Math.floor(Math.random() * 10340));
    //   blockData.push(Math.floor(Math.random() * 10340));
    // });

    /**
     * PRESENTATION
     */
    setChartData(prev => {
      return {
        labels: prev.labels.concat(new Date().toLocaleTimeString()),
        transactionData: prev.transactionData.concat(Math.floor(Math.random() * 10340)),
        blockData: prev.blockData.concat(
          Math.random() > 0.9 ? Math.floor(Math.random() * 10340) : null,
        ),
      };
    });
  };

  const fetchTransactionData = () => {
    fetchData().then(response => {
      if (!response) return null;
      transformChartData(response.data);
      transformTransactionsData(response.data);

      return 0;
    });
  };

  React.useEffect(() => {
    const transactionInterval = setInterval(() => {
      fetchTransactionData();

      return () => clearInterval(transactionInterval);
    }, TRANSACTION_CALL_TIMEOUT);

    fetchTransactionData();
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
            innerSubtitle={formatNumber(3729, { decimalsLength: 0 })}
            data={mockChartTableData.data}
            table={<Table headers={mockChartTableData.headers} rows={mockChartTableData.rows} />}
          />
        </Grid>
      </Grid>
      <Grid item>
        <LineChart data={generateChartData(chartData)} title="Transactions and Blocks Monitor" />
      </Grid>
      <Grid item>
        <Table headers={headers} rows={transactionList} title="Latest Transactions" />
      </Grid>
    </>
  );
};

export default Explorer;
