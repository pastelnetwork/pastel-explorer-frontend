import { useState } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { formatAddress } from '@utils/helpers/format';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import Pagination from '@components/Pagination/Pagination';
import { formatFullDate } from '@utils/helpers/date/date';
import { useTransfers } from '@hooks/useSenseDetails';
import { getParameterByName } from '@utils/helpers/url';
import * as TableStyles from '@components/Table/Table.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as NftDetailStyles from '@pages/Details/NftDetails/NftDetails.styles';
import CopyButton from '@components/CopyButton/CopyButton';

const LIMIT = 5;

const Transfers = () => {
  const txid = getParameterByName('txid');
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, totalItems } = useTransfers(txid, currentPage * LIMIT, LIMIT);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <NftDetailStyles.ItemActivityWrapper>
      <TableStyles.PaperWrapper>
        <TableStyles.TableWrapper className="scroll">
          <Table className="custom-table activities-table offers">
            <TableHead className="table__row-header">
              <TableRow>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.pastelID')}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.copySerialNr')}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.registrationTxId')}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.offerTxId')}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.acceptTxId')}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.itemTxId')}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {translate('pages.senseDetails.timestamp')}
                </TableStyles.TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow className="table__row" key={item.transactionHash}>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.pastelID')}:`}
                    className="cell-content nowrap"
                  >
                    {item.pastelID ? (
                      <RouterLink
                        route={`${ROUTES.TRANSACTION_DETAILS}/${item.pastelID}`}
                        value={formatAddress(item.pastelID, 5, -5)}
                        title={item.pastelID}
                        className="address-link nowrap inline-block read-more full"
                      />
                    ) : (
                      translate('common.na')
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.copySerialNr')}:`}
                    className="cell-content nowrap"
                  >
                    {item.copy_serial_nr ? item.copy_serial_nr : translate('common.na')}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.registrationTxId')}:`}
                    className="cell-content nowrap"
                  >
                    {item.registration_txid ? (
                      <div className="copy-wrapper">
                        <CopyButton copyText={item.registration_txid} />
                        <RouterLink
                          route={`${ROUTES.PASTEL_ID_DETAILS}/${item.registration_txid}`}
                          value={formatAddress(item.registration_txid, 5, -5)}
                          title={item.registration_txid}
                          className="address-link nowrap inline-block read-more full"
                        />
                      </div>
                    ) : (
                      translate('common.na')
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.offerTxId')}:`}
                    className="cell-content nowrap"
                  >
                    {item.offer_txid ? (
                      <div className="copy-wrapper">
                        <CopyButton copyText={item.offer_txid} />
                        <RouterLink
                          route={`${ROUTES.PASTEL_ID_DETAILS}/${item.offer_txid}`}
                          value={formatAddress(item.offer_txid, 5, -5)}
                          title={item.offer_txid}
                          className="address-link nowrap inline-block read-more full"
                        />
                      </div>
                    ) : (
                      translate('common.na')
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.acceptTxId')}:`}
                    className="cell-content nowrap"
                  >
                    {item.accept_txid ? (
                      <div className="copy-wrapper">
                        <CopyButton copyText={item.accept_txid} />
                        <RouterLink
                          route={`${ROUTES.PASTEL_ID_DETAILS}/${item.accept_txid}`}
                          value={formatAddress(item.accept_txid, 5, -5)}
                          title={item.accept_txid}
                          className="address-link nowrap inline-block read-more full"
                        />
                      </div>
                    ) : (
                      translate('common.na')
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.itemTxId')}:`}
                    className="cell-content nowrap"
                  >
                    {item.item_txid ? (
                      <div className="copy-wrapper">
                        <CopyButton copyText={item.item_txid} />
                        <RouterLink
                          route={`${ROUTES.PASTEL_ID_DETAILS}/${item.item_txid}`}
                          value={formatAddress(item.item_txid, 5, -5)}
                          title={item.item_txid}
                          className="address-link nowrap inline-block read-more full"
                        />
                      </div>
                    ) : (
                      translate('common.na')
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${translate('pages.senseDetails.timestamp')}:`}
                    className="cell-content nowrap"
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
        <NftDetailStyles.PaginationWrapper>
          <Pagination
            totalPage={totalPages}
            onPageChange={handlePageChange}
            defaultPage={currentPage}
          />
        </NftDetailStyles.PaginationWrapper>
      ) : null}
    </NftDetailStyles.ItemActivityWrapper>
  ) : (
    <NftDetailStyles.Wrapper className="no-data">
      <Typography component="h2" variant="h5" gutterBottom className="no-data-content">
        {translate('common.noData')}
      </Typography>
    </NftDetailStyles.Wrapper>
  );
};

export default Transfers;
