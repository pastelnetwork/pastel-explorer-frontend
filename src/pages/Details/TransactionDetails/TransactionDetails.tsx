import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { RowsProps } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';
import TicketsList from '@pages/Details/BlockDetails/Tickets';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import * as ROUTES from '@utils/constants/routes';
import { formattedDate } from '@utils/helpers/date/date';
import {
  TransactionEvent,
  DirectionType,
  ITransactionDetails,
  ITicket,
  TSenseRequests,
} from '@utils/types/ITransactions';
import { useSortData } from '@utils/hooks';
import useCurrentStats from '@hooks/useCurrentStats';
import useTransactionDetails from '@hooks/useTransactionDetails';

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
  const { currentStats, isCurrentStatsLoading } = useCurrentStats();
  const { data, isLoading } = useTransactionDetails(id);
  const [transaction, setTransaction] = useState<ITransactionDetails | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [senses, setSenses] = useState<TSenseRequests[]>([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [openRawDataModal, setOpenRawDataModal] = useState(false);

  const toggleOpenRawData = () => setOpenRawDataModal(prevState => !prevState);
  const [transactionEvents, handleClickSort] = useSortData<TransactionEvent>({
    inititalData: transaction?.transactionEvents || null,
  });

  useEffect(() => {
    if (currentStats?.usdPrice) {
      setExchangeRate(currentStats?.usdPrice);
    }
  }, [isCurrentStatsLoading]);

  useEffect(() => {
    if (data) {
      setTransaction(data);
      if (data?.ticketsList) {
        setTickets(data.ticketsList);
      }
      if (data?.senseData) {
        setSenses(data.senseData);
      }
    }
  }, [isLoading, data]);

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

  return transaction ? (
    <Styles.Wrapper>
      <Header title="Transaction Details" />
      <Grid container direction="column">
        <Styles.TransactionDesc item>
          {generateTableTitle(transaction, toggleOpenRawData)}
        </Styles.TransactionDesc>
        <TransactionRawData
          open={openRawDataModal}
          toggleOpen={toggleOpenRawData}
          rawData={transaction.rawData}
          tickets={tickets}
          senses={senses}
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
                    blockWrapperClassName="input-addresses-wrapper addresses-wrapper"
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
                  blockWrapperClassName="addresses-wrapper"
                />
              </Styles.RightColumn>
            </Styles.GirdWrapper>
          )}
        </Styles.GridStyle>
        {tickets.length ? (
          <Styles.GridStyle item>
            <TicketsList data={tickets} senses={senses} showActivationTicket />
          </Styles.GridStyle>
        ) : null}
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
