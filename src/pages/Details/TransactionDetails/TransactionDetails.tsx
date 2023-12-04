import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import parse from 'html-react-parser';

import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Table, { RowsProps } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';
import TicketsList from '@pages/Details/BlockDetails/Tickets';
import Fire from '@components/SvgIcon/Fire';
import { isPastelBurnAddress } from '@utils/appInfo';
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
import useTransactionDetails, { useUsdPrice } from '@hooks/useTransactionDetails';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as AddressDetailStyles from '@pages/Details/AddressDetails/AddressDetails.styles';
import * as CascadeDetailsStyles from '@pages/Details/CascadeDetails/CascadeDetails.styles';

import * as Styles from './TransactionDetails.styles';
import {
  addressHeaders,
  transactionHeaders,
  generateTableTitle,
  generateNonStandardTransactionInfo,
  generateCoinbaseInfo,
} from './TransactionDetails.helpers';
import TransactionRawData from './TransactionRawData';
import BurnAddressIcon from './BurnAddressIcon';

const TransactionDetails = () => {
  const { id } = useParams();
  const { usdPrice } = useUsdPrice();
  const { data, isLoading } = useTransactionDetails(id as string);
  const [transaction, setTransaction] = useState<ITransactionDetails | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [senses, setSenses] = useState<TSenseRequests[]>([]);
  const [openRawDataModal, setOpenRawDataModal] = useState(false);

  const toggleOpenRawData = () => setOpenRawDataModal(prevState => !prevState);
  const [transactionEvents, handleClickSort] = useSortData<TransactionEvent>({
    inititalData: transaction?.transactionEvents || null,
  });

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

    const tableTransactionEvents = typeTransactionEvents.map(
      ({ amount, address, type: addressType }, index) => {
        return {
          id: index,
          data: [
            {
              id: 1,
              value: (
                <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                  <Styles.RowWrapper>
                    <CopyButton copyText={address} />
                    <RouterLink
                      route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
                      value={address}
                      textSize="large"
                      title={address}
                      className="address-link"
                    />
                    {isPastelBurnAddress(address) ? (
                      <Tooltip title={translateDropdown('pages.addressDetails.pastelBurnAddress')}>
                        <AddressDetailStyles.FireIcon>
                          <Fire />
                        </AddressDetailStyles.FireIcon>
                      </Tooltip>
                    ) : null}
                    <BurnAddressIcon type={addressType} />
                  </Styles.RowWrapper>
                </Grid>
              ),
            },
            { id: 2, value: formatNumber(amount, { decimalsLength: 2 }) },
            { id: 3, value: formatNumber(amount * usdPrice, { decimalsLength: 2 }, '$') },
          ],
        };
      },
    );

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
          {
            id: 5,
            value: formattedDate(timestamp, {
              dayName: false,
            }),
          },
        ],
      },
    ];
  };

  if (isLoading) {
    return (
      <Styles.LoadingWrapper>
        <Styles.Loader>
          <CircularProgress size={40} />
        </Styles.Loader>
      </Styles.LoadingWrapper>
    );
  }

  return transaction ? (
    <Styles.Wrapper>
      <Header title={translateDropdown('pages.transactionDetails.transactionDetails')} />
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
            title={translateDropdown('pages.transactionDetails.overview')}
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
                    title={translateDropdown('pages.transactionDetails.inputAddresses')}
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
                  title={translateDropdown('pages.transactionDetails.recipients')}
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
          <Styles.GridStyle item className="mt-24px">
            <TicketsList
              data={tickets}
              senses={senses}
              showActivationTicket
              variant="transaction"
            />
          </Styles.GridStyle>
        ) : null}
      </Grid>
    </Styles.Wrapper>
  ) : (
    <CascadeDetailsStyles.Wrapper className="content-center-wrapper">
      <Grid
        container
        sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        spacing={2}
      >
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {parse(translate('pages.cascade.404'))}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {parse(translate('pages.transactionDetails.transactionNotFound'))}
      </Typography>
    </CascadeDetailsStyles.Wrapper>
  );
};

export default TransactionDetails;
