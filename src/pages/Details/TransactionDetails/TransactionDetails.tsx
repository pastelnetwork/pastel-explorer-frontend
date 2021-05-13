import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { RowsProps } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { formattedDate } from '@utils/helpers/date/date';
import { TransactionEvent, DirectionType, ITransactionDetails } from '@utils/types/ITransactions';
import { ISummary } from '@utils/types/ISummary';

import * as Styles from './TransactionDetails.styles';
import {
  addressHeaders,
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
  const [exchangeRate, setExchangeRate] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const [openRawDataModal, setOpenRawDataModal] = React.useState(false);
  const fetchTransactions = useFetch<{ data: ITransactionDetails }>({
    method: 'get',
    url: `${URLS.TRANSACTION_URL}/${id}`,
  });
  const fetchSummary = useFetch<ISummary>({ method: 'get', url: URLS.SUMMARY_URL });

  const toggleOpenRawData = () => setOpenRawDataModal(prevState => !prevState);

  const handleTransactionFetch = () => {
    fetchTransactions.fetchData().then(response => {
      if (!response?.data) {
        setRedirect(true);
      } else {
        setTransaction(response.data);
      }
    });
  };

  const handleExchangeRateFetch = () => {
    fetchSummary.fetchData().then(response => {
      if (!response) return null;
      return setExchangeRate(response?.currentStats?.usdPrice || 0);
    });
  };

  React.useEffect(() => {
    handleTransactionFetch();
    handleExchangeRateFetch();
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
            value: (
              <Grid container alignItems="center" wrap="nowrap">
                <CopyButton copyText={address} />
                <RouterLink
                  route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
                  value={address}
                  textSize="large"
                />
              </Grid>
            ),
          },
          { id: 2, value: formatNumber(amount, { decimalsLength: 2 }) },
          { id: 3, value: formatNumber(amount * exchangeRate, { decimalsLength: 4 }) },
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
            value:
              blockHash !== 'N/A' ? (
                <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={blockHash} />
              ) : (
                '-'
              ),
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
                  headers={addressHeaders}
                  rows={generateTransactionEvents(transaction.transactionEvents, 'Outgoing')}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Table
                  title="Recipients"
                  headers={addressHeaders}
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
