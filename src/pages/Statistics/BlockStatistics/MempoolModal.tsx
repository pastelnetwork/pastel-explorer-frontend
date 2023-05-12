import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TimeAgo from 'react-timeago';

import { getCurrencyName } from '@utils/appInfo';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { formatAddress } from '@utils/helpers/format';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { translate } from '@utils/helpers/i18n';
import { useMempool } from '@hooks/useBlockStatistics';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as TableStyles from '@components/Table/Table.styles';

import * as Styles from '../Statistics.styles';

interface IMempoolModal {
  open: boolean;
  onClose: () => void;
}

const MempoolModal: React.FC<IMempoolModal> = ({ open, onClose }) => {
  const { mempools, isLoading } = useMempool();
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
    if (isLoading) {
      return (
        <TransactionStyles.LoadingWrapper>
          <TransactionStyles.Loader>
            <CircularProgress size={40} />
          </TransactionStyles.Loader>
        </TransactionStyles.LoadingWrapper>
      );
    }

    return (
      <TableStyles.BlockWrapper className="mempool-wrapper">
        <TableStyles.BlockTitle>{translate('pages.movement.mempool')}</TableStyles.BlockTitle>
        <Styles.ContentWrapper>
          <TableStyles.PaperWrapper>
            <TableStyles.TableWrapper>
              <Table className="custom-table mempool-table">
                <TableHead className="table__row-header">
                  <TableRow>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.txID')}
                    </TableStyles.TableCell>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.recipients')}
                    </TableStyles.TableCell>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.amount', { currency: getCurrencyName() })}
                    </TableStyles.TableCell>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.size')}
                    </TableStyles.TableCell>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.fee', { currency: getCurrencyName() })}
                    </TableStyles.TableCell>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.ticketQuantity')}
                    </TableStyles.TableCell>
                    <TableStyles.TableCell className="table__row-header--cell">
                      {translate('pages.movement.timestamp')}
                    </TableStyles.TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mempools?.map(mempool => {
                    const ticketsTypeList = getTicketsTypeList(mempool.tickets || '');
                    return (
                      <TableRow className="table__row" key={mempool.id}>
                        <TableStyles.RowCell
                          data-title={`${translate('pages.movement.txID')}:`}
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
                          data-title={`${translate('pages.movement.recipients')}:`}
                          className="cell-content"
                        >
                          {formatNumber(mempool.recipientCount)}
                        </TableStyles.RowCell>
                        <TableStyles.RowCell
                          data-title={`${translate('pages.movement.amount', {
                            currency: getCurrencyName(),
                          })}:`}
                          className="cell-content"
                        >
                          {mempool.isNonStandard ? (
                            <Tooltip title={translate('pages.movement.shieldedTransactionInfo')}>
                              <span>{translate('common.unknown')}</span>
                            </Tooltip>
                          ) : (
                            formatNumber(mempool.totalAmount, { decimalsLength: 2 })
                          )}
                        </TableStyles.RowCell>
                        <TableStyles.RowCell
                          data-title={`${translate('pages.movement.size')}:`}
                          className="cell-content"
                        >
                          {formatNumber(mempool.size / 1024, { decimalsLength: 2 })}{' '}
                          {translate('pages.movement.kb')}
                        </TableStyles.RowCell>
                        <TableStyles.RowCell
                          data-title={`${translate('pages.movement.fee', {
                            currency: getCurrencyName(),
                          })}:`}
                          className="cell-content"
                        >
                          {formatNumber(mempool.fee, { decimalsLength: 2 })}
                        </TableStyles.RowCell>
                        <TableStyles.RowCell
                          data-title={`${translate('pages.movement.ticketQuantity')}:`}
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
                          data-title={`${translate('pages.movement.timestamp')}:`}
                          className="cell-content"
                        >
                          <TimeAgo date={mempool.timestamp * 1000} />
                        </TableStyles.RowCell>
                      </TableRow>
                    );
                  })}
                  {!mempools?.length ? (
                    <TableRow className="table__row">
                      <TableStyles.RowCell className="cell-content" colSpan={8}>
                        <Styles.NoContent>{translate('common.noData')}</Styles.NoContent>
                      </TableStyles.RowCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableStyles.TableWrapper>
          </TableStyles.PaperWrapper>
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
