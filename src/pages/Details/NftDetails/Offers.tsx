import { useState } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formatAddress } from '@utils/helpers/format';
import { getCurrencyName } from '@utils/appInfo';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import Pagination from '@components/Pagination/Pagination';
import { formatFullDate } from '@utils/helpers/date/date';
import { useOffers } from '@hooks/useNftDetails';
import { useUsdPrice } from '@hooks/useTransactionDetails';
import { getParameterByName } from '@utils/helpers/url';
import * as TableStyles from '@components/Table/Table.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import CopyButton from '@components/CopyButton/CopyButton';

import * as Styles from './NftDetails.styles';

const LIMIT = 5;

const Offers: React.FC = () => {
  const { usdPrice } = useUsdPrice();
  const txid = getParameterByName('txid');
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, totalItems } = useOffers(txid, currentPage * LIMIT, LIMIT);

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
    <Styles.ItemActivityWrapper className={`offers ${getClassName()}`}>
      <TableStyles.PaperWrapper>
        <TableStyles.TableWrapper className="scroll">
          <Table className="custom-table activities-table offers">
            <TableHead className="table__row-header">
              <TableRow>
                <TableStyles.TableCell className="nowrap">
                  {parse(translate('pages.nftDetails.price'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {parse(translate('pages.nftDetails.usdPrice'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {parse(translate('pages.nftDetails.copyNumber'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {parse(translate('pages.nftDetails.txID'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {parse(translate('pages.nftDetails.from'))}
                </TableStyles.TableCell>
                <TableStyles.TableCell className="nowrap">
                  {parse(translate('pages.nftDetails.timestamp'))}
                </TableStyles.TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow className="table__row" key={item.transactionHash}>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.price'))}:`}
                    className="cell-content bold nowrap"
                  >
                    <TicketStyles.TicketTitle>
                      {formatNumber(item.price)} {getCurrencyName()}
                    </TicketStyles.TicketTitle>
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.usdPrice'))}:`}
                    className="cell-content nowrap"
                  >
                    ${formatNumber(item.price * usdPrice, { decimalsLength: 2 })}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.copyNumber'))}:`}
                    className="cell-content nowrap"
                  >
                    {item.copy_number}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.txID'))}:`}
                    className="cell-content nowrap"
                  >
                    {item.transactionHash ? (
                      <div>
                        <CopyButton copyText={item.transactionHash} />
                        <RouterLink
                          route={`${ROUTES.TRANSACTION_DETAILS}/${item.transactionHash}`}
                          value={formatAddress(item.transactionHash, 5, -5)}
                          title={item.transactionHash}
                          className="address-link nowrap inline-block read-more full"
                        />
                      </div>
                    ) : (
                      parse(translate('common.na'))
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.from'))}:`}
                    className="cell-content nowrap"
                  >
                    {item.pastelID ? (
                      <RouterLink
                        route={`${ROUTES.PASTEL_ID_DETAILS}/${item.pastelID}`}
                        value={formatAddress(item.pastelID, 5, -5)}
                        title={item.pastelID}
                        className="address-link nowrap inline-block read-more full"
                      />
                    ) : (
                      parse(translate('common.na'))
                    )}
                  </TableStyles.RowCell>
                  <TableStyles.RowCell
                    data-title={`${parse(translate('pages.nftDetails.timestamp'))}:`}
                    className="cell-content nowrap"
                  >
                    {formatFullDate(item.timestamp, { dayName: false })}
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
      <Typography component="h2" variant="h5" gutterBottom className="no-data-content">
        {parse(translate('common.noData'))}
      </Typography>
    </Styles.Wrapper>
  );
};

export default Offers;
