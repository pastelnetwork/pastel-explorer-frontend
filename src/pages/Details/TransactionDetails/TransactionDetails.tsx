import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { RowsProps } from '@components/Table/Table';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { formattedDate } from '@utils/helpers/date/date';
import { TransactionEvent, DirectionType, ITransactionDetails } from '@utils/types/ITransactions';

import * as Styles from './TransactionDetails.styles';
import {
  inputAddressHeaders,
  recipientsHeaders,
  transactionHeaders,
  generateTableTitle,
  generateNonStandardTransactionInfo,
} from './TransactionDetails.helpers';
import TransactionRawData from './TransactionRawData';

interface ParamTypes {
  id: string;
}

const TransactionDetails = () => {
  const { id } = useParams<ParamTypes>();
  const [transaction, setTransaction] = React.useState<ITransactionDetails | null>(null);
  const [redirect, setRedirect] = React.useState(false);
  const [openRawDataModal, setOpenRawDataModal] = React.useState(false);
  const { fetchData } = useFetch<{ data: ITransactionDetails }>({
    method: 'get',
    url: `${URLS.TRANSACTION_URL}/${id}`,
  });

  const toggleOpenRawData = () => setOpenRawDataModal(prevState => !prevState);

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response?.data) {
        setRedirect(true);
      } else {
        setTransaction(response.data);
      }
    });
  }, [id]);

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
          {
            id: 1,
            value: <RouterLink route={`${ROUTES.ADDRESS_DETAILS}/${address}`} value={address} />,
          },
          { id: 2, value: formatNumber(amount, { decimalsLength: 2 }) },
        ],
      };
    });

    return tableTransactionEvents;
  };

  const generateTransactionTable = ({
    blockHash,
    timestamp,
    block,
  }: ITransactionDetails): RowsProps[] => {
    return [
      {
        id: 1,
        data: [
          { id: 1, value: block.confirmations },
          {
            id: 2,
            value: <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={blockHash} />,
          },
          { id: 3, value: formattedDate(timestamp) },
        ],
      },
    ];
  };

  if (redirect) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return transaction ? (
    <>
      <Header title="Transaction Details" />
      <Grid container direction="column" spacing={2}>
        <Styles.TransactionDesc item onClick={toggleOpenRawData}>
          {generateTableTitle(transaction)}
        </Styles.TransactionDesc>
        <TransactionRawData
          open={openRawDataModal}
          toggleOpen={toggleOpenRawData}
          rawData={transaction.rawData}
        />
        <Grid item>
          <Table headers={transactionHeaders} rows={generateTransactionTable(transaction)} />
        </Grid>
        <Grid container spacing={6}>
          {transaction.isNonStandard ? (
            generateNonStandardTransactionInfo()
          ) : (
            <>
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
            </>
          )}
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default TransactionDetails;
