import * as React from 'react';
import getTime from 'date-fns/getTime';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { currentDate, getDate } from '@utils/helpers/date/date';
import { ILastTransactionsResponse, ITransactionsType } from '@utils/types/ITransactions';

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
  const { fetchData } = useFetch<ILastTransactionsResponse>({
    method: 'get',
    url: `${URLS.LAST_TRANSACTIONS_URL}/${TRANSACTION_MIN_AMOUNT}?_=${getTime(currentDate)}`,
  });

  const transformTransactionsData = (transactions: ITransactionsType) => {
    const transformedTransactions = transactions.map(
      ({ vout, txid, blockindex, total, timestamp }) => {
        return {
          id: txid,
          data: [
            { value: blockindex, id: 1 },
            { value: txid, id: 2 },
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
      <Grid item>
        <Table headers={headers} rows={transactionList} title="Latest Transactions" />
      </Grid>
    </>
  );
};

export default Explorer;
