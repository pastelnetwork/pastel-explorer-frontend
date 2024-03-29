import { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TimeAgo from 'react-timeago';
import parse from 'html-react-parser';

import { IMempool } from '@utils/types/ITransactions';
import * as URLS from '@utils/constants/urls';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import { getCurrencyName } from '@utils/appInfo';
import Pagination from '@components/Pagination/Pagination';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { formatAddress } from '@utils/helpers/format';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { translate } from '@utils/helpers/i18n';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as TableStyles from '@components/Table/Table.styles';

import * as Styles from '../Statistics.styles';

interface IMempoolModal {
  open: boolean;
  onClose: () => void;
}

const LIMIT = 10;

const MempoolModal: React.FC<IMempoolModal> = ({ open, onClose }) => {
  const [isLoading, setLoading] = useState(false);
  const [mempools, setMempools] = useState<IMempool[]>();
  const [totalPage, setTotalPage] = useState(0);

  const fetchData = async (offset = 0) => {
    setLoading(true);
    try {
      const { data, total } = await axiosGet(
        `${URLS.GET_MEMPOOL_URL}?offset=${offset}&limit=${LIMIT}`,
      );
      setMempools(data);
      setTotalPage(Math.ceil(total / LIMIT));
    } catch {
      setMempools([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page * LIMIT);
  };

  const useStyles = makeStyles(() =>
    createStyles({
      modal: {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        height: '100%',
      },
    }),
  );
  const classes = useStyles();

  const getModalContent = () => {
    return (
      <TableStyles.BlockWrapper className="mempool-wrapper">
        <TableStyles.BlockTitle>
          {parse(translate('pages.movement.mempool'))}
        </TableStyles.BlockTitle>
        <Styles.ContentWrapper>
          {isLoading ? (
            <TransactionStyles.LoadingWrapper>
              <TransactionStyles.Loader>
                <CircularProgress size={40} />
              </TransactionStyles.Loader>
            </TransactionStyles.LoadingWrapper>
          ) : (
            <TableStyles.PaperWrapper>
              <TableStyles.TableWrapper>
                <Table className="custom-table mempool-table">
                  <TableHead className="table__row-header">
                    <TableRow>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.txID'))}
                      </TableStyles.TableCell>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.recipients'))}
                      </TableStyles.TableCell>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.amount', { currency: getCurrencyName() }))}
                      </TableStyles.TableCell>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.size'))}
                      </TableStyles.TableCell>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.fee', { currency: getCurrencyName() }))}
                      </TableStyles.TableCell>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.ticketQuantity'))}
                      </TableStyles.TableCell>
                      <TableStyles.TableCell className="table__row-header--cell">
                        {parse(translate('pages.movement.timestamp'))}
                      </TableStyles.TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mempools?.map(mempool => {
                      const ticketsTypeList = getTicketsTypeList(mempool.tickets || '');
                      return (
                        <TableRow className="table__row" key={mempool.id}>
                          <TableStyles.RowCell
                            data-title={`${parse(translate('pages.movement.txID'))}:`}
                            className="cell-content"
                          >
                            <RouterLink
                              route={`${ROUTES.TRANSACTION_DETAILS}/${mempool.id}`}
                              value={formatAddress(mempool.id)}
                              title={mempool.id}
                              className="address-link"
                            />
                          </TableStyles.RowCell>
                          <TableStyles.RowCell
                            data-title={`${parse(translate('pages.movement.recipients'))}:`}
                            className="cell-content"
                          >
                            {formatNumber(mempool.recipientCount)}
                          </TableStyles.RowCell>
                          <TableStyles.RowCell
                            data-title={`${parse(
                              translate('pages.movement.amount', {
                                currency: getCurrencyName(),
                              }),
                            )}:`}
                            className="cell-content"
                          >
                            {mempool.isNonStandard ? (
                              <Tooltip
                                title={parse(translate('pages.movement.shieldedTransactionInfo'))}
                              >
                                <span>{parse(translate('common.unknown'))}</span>
                              </Tooltip>
                            ) : (
                              formatNumber(mempool.totalAmount, { decimalsLength: 2 })
                            )}
                          </TableStyles.RowCell>
                          <TableStyles.RowCell
                            data-title={`${parse(translate('pages.movement.size'))}:`}
                            className="cell-content"
                          >
                            {formatNumber(mempool.size / 1024, { decimalsLength: 2 })}{' '}
                            {translate('pages.movement.kb')}
                          </TableStyles.RowCell>
                          <TableStyles.RowCell
                            data-title={`${parse(
                              translate('pages.movement.fee', {
                                currency: getCurrencyName(),
                              }),
                            )}:`}
                            className="cell-content"
                          >
                            {formatNumber(mempool.fee, { decimalsLength: 2 })}
                          </TableStyles.RowCell>
                          <TableStyles.RowCell
                            data-title={`${parse(translate('pages.movement.ticketQuantity'))}:`}
                            className="cell-content"
                          >
                            {ticketsTypeList.total > 0 ? (
                              <RouterLink
                                route={`${ROUTES.TRANSACTION_DETAILS}/${mempool.id}`}
                                value={ticketsTypeList.total}
                                textSize="large"
                                title={ticketsTypeList.text.join(', <br />')}
                                isUseTooltip
                              />
                            ) : (
                              0
                            )}
                          </TableStyles.RowCell>
                          <TableStyles.RowCell
                            data-title={`${parse(translate('pages.movement.timestamp'))}:`}
                            className="cell-content"
                          >
                            <TimeAgo date={mempool.timestamp * 1000} live={false} />
                          </TableStyles.RowCell>
                        </TableRow>
                      );
                    })}
                    {!mempools?.length ? (
                      <TableRow className="table__row">
                        <TableStyles.RowCell className="cell-content" colSpan={8}>
                          <Styles.NoContent>{parse(translate('common.noData'))}</Styles.NoContent>
                        </TableStyles.RowCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TableStyles.TableWrapper>
            </TableStyles.PaperWrapper>
          )}
          {totalPage > 1 ? (
            <Styles.Pagination>
              <Pagination totalPage={totalPage} onPageChange={handlePageChange} />
            </Styles.Pagination>
          ) : null}
        </Styles.ContentWrapper>
      </TableStyles.BlockWrapper>
    );
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Styles.ModalContent>{getModalContent()}</Styles.ModalContent>
      </Fade>
    </Modal>
  );
};

export default MempoolModal;
