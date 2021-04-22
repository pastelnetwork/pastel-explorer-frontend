import * as React from 'react';
import getTime from 'date-fns/getTime';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { currentDate, formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

import { TRANSACTION_MIN_AMOUNT, headers } from './Movement.helpers';

const Movement: React.FC = () => {
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps> | null>(null);
  const { fetchData } = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: `${URLS.LAST_TRANSACTIONS_URL}/${TRANSACTION_MIN_AMOUNT}?_=${getTime(currentDate)}`,
  });

  // TODO When API url will change to V1, please delete not needed types from ITransaction
  const transformTransactionsData = (transactions: Array<ITransaction>) => {
    const transformedTransactions = transactions.map(({ total, txid, timestamp }) => {
      return {
        id: txid,
        data: [
          {
            value: formattedDate(timestamp, { dayName: false }),
            id: 1,
          },
          {
            value: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${txid}`} value={txid} />,
            id: 2,
          },
          { value: formatNumber(total, { divideToAmount: true, decimalsLength: 2 }), id: 3 },
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
