import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction, TransactionEvent, DirectionType } from '@utils/types/ITransactions';

import {
  inputAddressHeaders,
  recipientsHeaders,
  transactionHeaders,
} from './TransactionDetails.helpers';

interface ParamTypes {
  id: string;
}

const TransactionDetails = () => {
  const { id } = useParams<ParamTypes>();
  const [transaction, setTransaction] = React.useState<ITransaction | null>(null);
  const [redirect, setRedirect] = React.useState(false);
  const { fetchData } = useFetch<{ data: ITransaction }>({
    method: 'get',
    url: `${URLS.TRANSACTION_URL}/${id}`,
  });

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response || !response.data) {
        setRedirect(true);
      } else {
        setTransaction(response.data);
      }
    });
  }, []);

  if (redirect) {
    return <Redirect to="/404" />;
  }

  const generateTransactionEvents = (
    events: TransactionEvent[],
    type: DirectionType,
  ): RowsProps[] => {
    const typeTransactionEvents = events.filter(
      transactionEvent => transactionEvent.direction === type,
    );

    const tableTransactionEvents = typeTransactionEvents.map(({ amount, address }, index) => {
      return {
        id: index,
        data: [
          { id: 1, value: address },
          { id: 2, value: amount },
        ],
      };
    });

    return tableTransactionEvents;
  };

  const generateTransactionTable = ({ blockHash, timestamp }: ITransaction): RowsProps[] => {
    return [
      {
        id: 1,
        data: [
          { id: 1, value: '1' },
          { id: 2, value: blockHash },
          { id: 3, value: formattedDate(timestamp) },
        ],
      },
    ];
  };

  return transaction ? (
    <>
      <Header title="Transaction Details" />
      <Grid container direction="column">
        <Grid item>
          <Table
            title={`PSL txID: ${transaction.id}`}
            headers={transactionHeaders}
            rows={generateTransactionTable(transaction)}
          />
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <Table
              title="Input Addresses"
              headers={inputAddressHeaders}
              rows={generateTransactionEvents(transaction.transactionEvents, 'Outgoing')}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Table
              title="Recipients"
              headers={recipientsHeaders}
              rows={generateTransactionEvents(transaction.transactionEvents, 'Incoming')}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default TransactionDetails;
