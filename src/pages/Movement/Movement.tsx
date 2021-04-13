import * as React from 'react';
import { getTime } from 'date-fns';
import { Grid } from '@material-ui/core';
import { green, red, orange } from '@material-ui/core/colors';

import Header from '@components/Header/Header';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ILastTransactionsResponse, ITransactionsType } from '@utils/types/ITransactions';

import * as Styles from './Movement.styles';

const headers: Array<HeaderType> = [
  { id: 1, header: 'Timestamp' },
  { id: 2, header: 'txID' },
  { id: 3, header: 'Amount' },
];

const FLAGS = {
  low: 1000,
  high: 5000,
};

const TRANSACTION_MIN_AMOUNT = '100';

const Movement: React.FC = () => {
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps> | null>(null);
  const { fetchData } = useFetch<ILastTransactionsResponse>({
    method: 'get',
    url: `${URLS.LAST_TRANSACTIONS_URL}/${TRANSACTION_MIN_AMOUNT}?_=${getTime(new Date())}`,
  });

  const getAmountColor = (amount: number) => {
    if (amount > FLAGS.high) {
      return red[500];
    }

    if (amount > FLAGS.low) {
      return orange[500];
    }

    return green[500];
  };

  const getAmountElement = (amount: number) => {
    const displayAmount = amount / 100000000;
    const amountColor = getAmountColor(displayAmount);
    return <Styles.Chip label={displayAmount} backgroundColor={amountColor} />;
  };

  const transformTransactionsData = (transactions: ITransactionsType) => {
    const transformedTransactions = transactions.map(({ total, txid, timestamp }) => {
      const amountElement = getAmountElement(total);
      return {
        id: txid,
        data: [
          {
            value: new Date(timestamp * 1000).toUTCString(),
            id: 1,
          },
          { value: txid, id: 2 },
          { value: amountElement, id: 3 },
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
      <Header title="Movement" />
      <Grid item>
        <Table headers={headers} rows={transactionList} title="Movement Transactions" />
      </Grid>
    </>
  );
};

export default Movement;
