import { useState } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { formatAddress } from '@utils/helpers/format';
import { translate } from '@utils/helpers/i18n';
import Pagination from '@components/Pagination/Pagination';
import {
  INftRegistrationTicket,
  IOfferTicket,
  IAcceptTicket,
  ITransferTicket,
  INftActivationTicket,
  TItemActivity,
} from '@utils/types/ITransactions';
import { formatFullDate } from '@utils/helpers/date/date';
import { useItemActivity } from '@hooks/useNftDetails';
import { getParameterByName } from '@utils/helpers/url';
import * as TableStyles from '@components/Table/Table.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import CopyButton from '@components/CopyButton/CopyButton';

import { getActivityType } from './NftDetails.helpers';
import * as Styles from './NftDetails.styles';

const LIMIT = 5;

interface IItemActivity {
  activitiesType: string;
}

const ItemActivity: React.FC<IItemActivity> = ({ activitiesType }) => {
  const txid = getParameterByName('txid');
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, totalItems } = useItemActivity(
    txid,
    currentPage * LIMIT,
    LIMIT,
    activitiesType,
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEventDetails = (item: TItemActivity) => {
    const { ticket } = item;
    switch (ticket.type) {
      case 'transfer':
        return (
          <>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.offerTxId'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as ITransferTicket)?.offer_txid ? (
                  <span className="link-copy-wrapper">
                    <CopyButton copyText={(ticket as ITransferTicket)?.offer_txid} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${
                        (ticket as ITransferTicket)?.offer_txid
                      }`}
                      value={(ticket as ITransferTicket)?.offer_txid}
                      title={(ticket as ITransferTicket)?.offer_txid}
                      className="address-link read-more"
                    />
                  </span>
                ) : (
                  parse(translate('common.na'))
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.acceptTxID'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as ITransferTicket)?.accept_txid ? (
                  <span className="link-copy-wrapper">
                    <CopyButton copyText={(ticket as ITransferTicket)?.accept_txid} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${
                        (ticket as ITransferTicket)?.accept_txid
                      }`}
                      value={(ticket as ITransferTicket)?.accept_txid}
                      title={(ticket as ITransferTicket)?.accept_txid}
                      className="address-link read-more"
                    />
                  </span>
                ) : (
                  parse(translate('common.na'))
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.copySerialNr'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as ITransferTicket)?.copy_serial_nr || parse(translate('common.na'))}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
          </>
        );
      case 'accept':
        return (
          <>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.offerTxId'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IAcceptTicket)?.offer_txid ? (
                  <span className="link-copy-wrapper">
                    <CopyButton copyText={(ticket as IAcceptTicket)?.offer_txid} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${
                        (ticket as IAcceptTicket)?.offer_txid
                      }`}
                      value={(ticket as IAcceptTicket)?.offer_txid}
                      title={(ticket as IAcceptTicket)?.offer_txid}
                      className="address-link read-more"
                    />
                  </span>
                ) : (
                  parse(translate('common.na'))
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.price'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {formatNumber((ticket as IAcceptTicket)?.price || 0)} {getCurrencyName()}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
          </>
        );
      case 'offer':
        return (
          <>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.copyNumber'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.copy_number || parse(translate('common.na'))}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.askedPrice'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {formatNumber((ticket as IOfferTicket)?.asked_price || 0)} {getCurrencyName()}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.validAfter'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.valid_after || parse(translate('common.na'))}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.validBefore'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.valid_before || parse(translate('common.na'))}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span" className="event-details-title">
                {parse(translate('pages.nftDetails.lockedRecipient'))}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.locked_recipient &&
                (ticket as IOfferTicket)?.locked_recipient !== 'not defined' ? (
                  <RouterLink
                    route={`${ROUTES.PASTEL_ID_DETAILS}/${
                      (ticket as IOfferTicket)?.locked_recipient
                    }`}
                    value={(ticket as IOfferTicket)?.locked_recipient}
                    title={(ticket as IOfferTicket)?.locked_recipient}
                    className="address-link read-more"
                  />
                ) : (
                  parse(translate('common.na'))
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
          </>
        );
      case 'nft-act':
        return (
          <Styles.ContentItem>
            <TicketStyles.TicketTitle as="span" className="event-details-title">
              {parse(translate('pages.nftDetails.fee'))}:{' '}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent as="span">
              {formatNumber((ticket as INftActivationTicket)?.storage_fee || 0)} {getCurrencyName()}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        );
      default:
        return (
          <Styles.ContentItem>
            <TicketStyles.TicketTitle as="span" className="event-details-title">
              {parse(translate('pages.nftDetails.fee'))}:{' '}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent as="span">
              {formatNumber((ticket as INftRegistrationTicket)?.storage_fee || 0)}{' '}
              {getCurrencyName()}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        );
    }
  };

  if (isLoading) {
    return (
      <TransactionStyles.LoadingWrapper>
        <TransactionStyles.Loader>
          <CircularProgress size={40} />
        </TransactionStyles.Loader>
      </TransactionStyles.LoadingWrapper>
    );
  }

  const totalPages = Math.ceil(totalItems / LIMIT);

  const getClassName = () => {
    if (totalPages > 1) {
      return 'has-pagination';
    }
    if (data && data?.length > 4) {
      return 'has-scroll';
    }

    return '';
  };

  return data?.length ? (
    <Styles.ItemActivityWrapper className={getClassName()}>
      <TableStyles.PaperWrapper>
        <TableStyles.TableWrapper>
          <Table className="custom-table activities-table">
            <TableHead className="table__row-header">
              <TableRow>
                <TableStyles.TableCell>
                  {parse(translate('pages.nftDetails.event'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell>
                  {parse(translate('pages.nftDetails.txID'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell>
                  {parse(translate('pages.nftDetails.version'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell>
                  {parse(translate('pages.nftDetails.eventDetails'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell>
                  {parse(translate('pages.nftDetails.timestamp'))}
                </TableStyles.TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow className="table__row" key={item.transactionHash}>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.event'))}:`}
                    className="cell-content"
                  >
                    {getActivityType(item.ticket.type)}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.txID'))}:`}
                    className="cell-content"
                  >
                    <div className="copy-wrapper">
                      <CopyButton copyText={item.transactionHash} />
                      <RouterLink
                        route={`${ROUTES.TRANSACTION_DETAILS}/${item.transactionHash}`}
                        value={formatAddress(item.transactionHash, 5, -5)}
                        title={item.transactionHash}
                        className="address-link nowrap inline-block"
                      />
                    </div>
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.version'))}:`}
                    className="cell-content"
                  >
                    {item.ticket.version}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell data-title="" className="cell-content event-details">
                    {getEventDetails(item)}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.timestamp'))}:`}
                    className="cell-content"
                  >
                    {formatFullDate(item.transactionTime, { dayName: false })}
                  </TableStyles.RowCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableStyles.TableWrapper>
      </TableStyles.PaperWrapper>
      {totalPages > 1 ? (
        <Styles.PaginationWrapper>
          <Pagination
            totalPage={totalPages}
            onPageChange={handlePageChange}
            defaultPage={currentPage}
          />
        </Styles.PaginationWrapper>
      ) : null}
    </Styles.ItemActivityWrapper>
  ) : (
    <Styles.Wrapper className="no-data">
      <Typography component="h2" variant="h5" gutterBottom>
        {parse(translate('common.noData'))}
      </Typography>
    </Styles.Wrapper>
  );
};

export default ItemActivity;
