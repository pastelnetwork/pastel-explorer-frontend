import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { RowsProps } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';
import { getTicketTitle, TicketDetail } from '@components/Ticket';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { formattedDate } from '@utils/helpers/date/date';
import {
  TransactionEvent,
  DirectionType,
  ITransactionDetails,
  ITicket,
  TTicketType,
} from '@utils/types/ITransactions';
import { ISummary } from '@utils/types/ISummary';
import { useSortData } from '@utils/hooks';

import * as Styles from './TransactionDetails.styles';
import {
  addressHeaders,
  transactionHeaders,
  generateTableTitle,
  generateNonStandardTransactionInfo,
  generateCoinbaseInfo,
} from './TransactionDetails.helpers';
import TransactionRawData from './TransactionRawData';

interface ParamTypes {
  id: string;
}

const TransactionDetails = () => {
  const { id } = useParams<ParamTypes>();
  const [transaction, setTransaction] = React.useState<ITransactionDetails | null>(null);
  const [tickets, setTickets] = React.useState<ITicket[]>([]);
  const [exchangeRate, setExchangeRate] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const [openRawDataModal, setOpenRawDataModal] = React.useState(false);
  const fetchTransactions = useFetch<{ data: ITransactionDetails }>({
    method: 'get',
    url: `${URLS.TRANSACTION_URL}/${id}`,
  });

  const fetchSummary = useFetch<ISummary>({ method: 'get', url: URLS.SUMMARY_URL });

  const toggleOpenRawData = () => setOpenRawDataModal(prevState => !prevState);
  const [transactionEvents, handleClickSort] = useSortData<TransactionEvent>({
    inititalData: transaction?.transactionEvents || null,
  });
  const handleTransactionFetch = () => {
    fetchTransactions.fetchData().then(response => {
      if (!response?.data) {
        setRedirect(true);
      } else {
        setTransaction(response.data);
        if (response.data?.tickets) {
          setTickets(response.data?.tickets);
        }
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
    events: TransactionEvent[] | null,
    type: DirectionType,
  ): RowsProps[] => {
    if (!events) {
      return [];
    }
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
                <Styles.RowWrapper>
                  <CopyButton copyText={address} />
                  <RouterLink
                    route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
                    value={address}
                    textSize="large"
                    title={address}
                    className="address-link"
                  />
                </Styles.RowWrapper>
              </Grid>
            ),
          },
          { id: 2, value: formatNumber(amount, { decimalsLength: 2 }) },
          { id: 3, value: formatNumber(amount * exchangeRate, { decimalsLength: 2 }, '$') },
        ],
      };
    });

    return tableTransactionEvents;
  };

  const generateTransactionTable = ({
    blockHash,
    timestamp,
    block,
    totalAmount,
    recipientCount,
  }: ITransactionDetails): RowsProps[] => {
    return [
      {
        id: 1,
        data: [
          {
            id: 1,
            value:
              blockHash !== 'N/A' ? (
                <RouterLink
                  route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`}
                  value={blockHash}
                  className="transaction-hash"
                />
              ) : (
                '-'
              ),
          },
          { id: 2, value: block.confirmations },
          { id: 3, value: recipientCount },
          { id: 4, value: formatNumber(totalAmount) },
          { id: 5, value: formattedDate(timestamp) },
        ],
      },
    ];
  };

  if (redirect) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return transaction ? (
    <Styles.Wrapper>
      <Header title="Transaction Details" />
      <Grid container direction="column" spacing={2}>
        <Styles.TransactionDesc item>
          {generateTableTitle(transaction, toggleOpenRawData)}
        </Styles.TransactionDesc>
        <TransactionRawData
          open={openRawDataModal}
          toggleOpen={toggleOpenRawData}
          rawData={transaction.rawData}
          tickets={tickets}
        />
        <Styles.GridStyle item>
          <Table
            headers={transactionHeaders}
            rows={generateTransactionTable(transaction)}
            className="transaction"
            blockWrapperClassName="transaction-wrapper"
            tableWrapperClassName="none-border-radius-top"
            title="Overview"
          />
        </Styles.GridStyle>
        <Styles.GridStyle item>
          {transaction.isNonStandard ? (
            generateNonStandardTransactionInfo()
          ) : (
            <Styles.GirdWrapper>
              <Styles.LeftColumn>
                {transaction.coinbase === 1 ? (
                  generateCoinbaseInfo(transaction.totalAmount)
                ) : (
                  <Table
                    title="Input Addresses"
                    headers={addressHeaders}
                    handleClickSort={handleClickSort}
                    rows={generateTransactionEvents(transactionEvents, 'Outgoing')}
                    className="input-addresses"
                    blockWrapperClassName="input-addresses-wrapper"
                    tableWrapperClassName="none-border-radius-top"
                  />
                )}
              </Styles.LeftColumn>
              <Styles.RightColumn>
                <Table
                  title="Recipients"
                  headers={addressHeaders}
                  rows={generateTransactionEvents(transactionEvents, 'Incoming')}
                  handleClickSort={handleClickSort}
                  className="recipients"
                  tableWrapperClassName="none-border-radius-top"
                />
              </Styles.RightColumn>
            </Styles.GirdWrapper>
          )}
        </Styles.GridStyle>
        {tickets.length
          ? tickets.map(ticket => (
              <Styles.GridStyle item key={ticket.type}>
                <TicketDetail
                  title={getTicketTitle(ticket.type as TTicketType)}
                  type={ticket.type as TTicketType}
                  ticket={ticket.data.ticket}
                />
              </Styles.GridStyle>
            ))
          : null}
      </Grid>
    </Styles.Wrapper>
  ) : (
    <Styles.LoadingWrapper>
      <Styles.Loader>
        <CircularProgress size={40} />
      </Styles.Loader>
    </Styles.LoadingWrapper>
  );
};

export default TransactionDetails;
