import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@material-ui/core';

import Summary from '@components/Summary/Summary';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ILastTransactionsResponse } from '@utils/types/IExplorer';

import * as Styles from './Explorer.styles';

const headers: Array<HeaderType> = [
  { id: 1, header: 'Block' },
  { id: 2, header: 'Hash' },
  { id: 3, header: 'Recipients' },
  { id: 4, header: 'Amount (PSL)' },
  { id: 5, header: 'Timestamp' },
];

interface TransactionProps {
  blockhash: string;
  blockindex: number;
  timestamp: number;
  total: number;
  txid: string;
  vin: Array<{ addresses: string; amount: number }>;
  vout: Array<{ addresses: string; amount: number }>;
}

type TransactionsType = Array<TransactionProps>;

const Explorer: React.FC = () => {
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps> | null>(null);
  const { fetchData } = useFetch<ILastTransactionsResponse>({
    method: 'get',
    url: `${URLS.LAST_TRANSACTIONS_URL}/0.00000001?_=${new Date().getTime()}`,
  });

  const generateDisplayAmount = (amount: number): string => {
    const splitAmount = amount.toString().split('');
    const firstPart = splitAmount.splice(0, 4).join('');
    const secondPart = splitAmount.splice(4).join('');

    return `${firstPart}.${secondPart}`;
  };

  const transformTransactionsData = (transactions: TransactionsType): void => {
    const transformedTransactions = transactions.map(transaction => {
      const recipients = transaction.vout.length;
      const amount = transaction.vin.reduce((acc, element) => acc + element.amount, 0);

      return {
        id: transaction.txid,
        data: [
          { value: transaction.blockindex, id: 1 },
          { value: transaction.txid, id: 2 },
          { value: recipients, id: 3 },
          { value: generateDisplayAmount(amount), id: 4 },
          {
            value: new Date(transaction.timestamp * 1000).toUTCString(),
            id: 5,
          },
        ],
      };
    });

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
      <Helmet title="Explorer" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Styles.Typography variant="h3" gutterBottom>
            Explorer
          </Styles.Typography>
        </Grid>
        <Grid item />
      </Grid>
      <Styles.Divider my={6} />
      <Summary />
      <Grid item>
        <Table headers={headers} rows={transactionList} title="Latest Transactions" />
      </Grid>
    </>
  );
};

export default Explorer;
