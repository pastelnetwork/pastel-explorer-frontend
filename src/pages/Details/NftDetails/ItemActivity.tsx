import { useState } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

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

import { getActivityType } from './NftDetails.helpers';
import * as Styles from './NftDetails.styles';

const LIMIT = 5;

const ItemActivity = () => {
  const txid = getParameterByName('txid');
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, totalItems } = useItemActivity(txid, currentPage * LIMIT, LIMIT);
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
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.offerTxId')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as ITransferTicket)?.offer_txid ? (
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${
                      (ticket as ITransferTicket)?.offer_txid
                    }`}
                    value={(ticket as ITransferTicket)?.offer_txid}
                    title={(ticket as ITransferTicket)?.offer_txid}
                    className="address-link read-more"
                  />
                ) : (
                  translate('common.na')
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.acceptTxID')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as ITransferTicket)?.accept_txid ? (
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${
                      (ticket as ITransferTicket)?.accept_txid
                    }`}
                    value={(ticket as ITransferTicket)?.accept_txid}
                    title={(ticket as ITransferTicket)?.accept_txid}
                    className="address-link read-more"
                  />
                ) : (
                  translate('common.na')
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.copySerialNr')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as ITransferTicket)?.copy_serial_nr || translate('common.na')}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
          </>
        );
      case 'accept':
        return (
          <>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.offerTxId')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IAcceptTicket)?.offer_txid ? (
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${(ticket as IAcceptTicket)?.offer_txid}`}
                    value={(ticket as IAcceptTicket)?.offer_txid}
                    title={(ticket as IAcceptTicket)?.offer_txid}
                    className="address-link read-more"
                  />
                ) : (
                  translate('common.na')
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.price')}:{' '}
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
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.copyNumber')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.copy_number || translate('common.na')}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.askedPrice')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {formatNumber((ticket as IOfferTicket)?.asked_price || 0)} {getCurrencyName()}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.validAfter')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.valid_after || translate('common.na')}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.validBefore')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.valid_before || translate('common.na')}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
            <Styles.ContentItem>
              <TicketStyles.TicketTitle as="span">
                {translate('pages.nftDetails.lockedRecipient')}:{' '}
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent as="span">
                {(ticket as IOfferTicket)?.locked_recipient ? (
                  <RouterLink
                    route={`${ROUTES.PASTEL_ID_DETAILS}/${
                      (ticket as IOfferTicket)?.locked_recipient
                    }`}
                    value={(ticket as IOfferTicket)?.locked_recipient}
                    title={(ticket as IOfferTicket)?.locked_recipient}
                    className="address-link read-more"
                  />
                ) : (
                  translate('common.na')
                )}
              </TicketStyles.TicketContent>
            </Styles.ContentItem>
          </>
        );
      case 'nft-act':
        return (
          <Styles.ContentItem>
            <TicketStyles.TicketTitle as="span">
              {translate('pages.nftDetails.fee')}:{' '}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent as="span">
              {formatNumber((ticket as INftActivationTicket)?.storage_fee || 0)} {getCurrencyName()}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        );
      default:
        return (
          <Styles.ContentItem>
            <TicketStyles.TicketTitle as="span">
              {translate('pages.nftDetails.fee')}:{' '}
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

  return data?.length ? (
    <Styles.ItemActivityWrapper>
      <TableStyles.PaperWrapper>
        <TableStyles.TableWrapper>
          <Table className="custom-table activities-table">
            <TableHead className="table__row-header">
              <TableRow>
                <TableStyles.TableCell width={180}>
                  {translate('pages.nftDetails.event')}
                </TableStyles.TableCell>
                <TableStyles.TableCell width={180}>
                  {translate('pages.nftDetails.txID')}
                </TableStyles.TableCell>
                <TableStyles.TableCell width={120}>
                  {translate('pages.nftDetails.version')}
                </TableStyles.TableCell>
                <TableStyles.TableCell>
                  {translate('pages.nftDetails.eventDetails')}
                </TableStyles.TableCell>
                <TableStyles.TableCell width={250}>
                  {translate('pages.nftDetails.timestamp')}
                </TableStyles.TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow className="table__row" key={item.transactionHash}>
                  <TableStyles.RowCell
                    data-title={translate('pages.nftDetails.event')}
                    className="cell-content"
                  >
                    {getActivityType(item.ticket.type)}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={translate('pages.nftDetails.txID')}
                    className="cell-content"
                  >
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${item.transactionHash}`}
                      value={formatAddress(item.transactionHash, 5, -5)}
                      title={item.transactionHash}
                      className="address-link nowrap inline-block"
                    />
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={translate('pages.nftDetails.version')}
                    className="cell-content"
                  >
                    {item.ticket.version}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell data-title="" className="cell-content">
                    {getEventDetails(item)}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={translate('pages.nftDetails.timestamp')}
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
        {translate('common.noData')}
      </Typography>
    </Styles.Wrapper>
  );
};

export default ItemActivity;
