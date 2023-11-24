// React
import { memo, useEffect, useState } from 'react';
// third party
import { Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// application
import { TAppTheme } from '@theme/index';
import RouterLink from '@components/RouterLink/RouterLink';
import { generateBlockKeyValue } from '@pages/Explorer/LatestTransactions/LatestTransactions.helpers';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';
import { TransactionThunks } from '@redux/thunk';
import { AppThunkDispatch } from '@redux/types';
import { useTransactionLatestTransactions } from '@redux/hooks/transactionsHooks';
import { ITransaction } from '@utils/types/ITransactions';
import { TRANSACTION_DETAILS } from '@utils/constants/routes';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import Hourglass from '@components/Hourglass/Hourglass';
import CopyButton from '@components/CopyButton/CopyButton';
import * as BlockStyles from '@pages/Blocks/Blocks.styles';
import { useShowLess } from '@pages/Tickets/Tickets.helpers';

import { Link } from '@components/Link/Link.styles';
import { getCurrencyName } from '@utils/appInfo';
import { formatAddress } from '@utils/helpers/format';
import * as Styles from './Explorer.styles';

const StyledTableCell = withStyles((theme: TAppTheme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: TAppTheme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  viewAll: {
    padding: 16,
  },
});

function LatestTransactions() {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);
  const classes = useStyles();
  const dispatch = useDispatch<AppThunkDispatch>();
  const transactions = useTransactionLatestTransactions();

  useEffect(() => {
    dispatch(TransactionThunks.getLatestBlocks());
  }, []);
  return (
    <Styles.BlockWrapper className="mt-24 latest-transactions-wrapper">
      <Styles.BlockTitle className="latest-blocks">
        <span>{parse(translate('pages.explorer.latestTransactionsLive'))}</span>
        <Styles.LinkWrapper>
          <Link to="/movement" className="view-all">
            <Typography align="center" className={classes.viewAll}>
              {parse(translate('pages.explorer.viewAll'))} <ArrowForwardIos />
            </Typography>
          </Link>
          <IconButton
            onClick={() => setShowLess(!showLess)}
            className={`btn-toggle ${showLess ? 'show-less' : ''}`}
          >
            <ExpandMoreIcon className="toggle-icon" />
          </IconButton>
        </Styles.LinkWrapper>
      </Styles.BlockTitle>
      {!showLess ? (
        <TableContainer component={Paper} className="table-container">
          <Table aria-label="customized table" className="custom-table latest-transactions">
            <TableHead className="table__row-header">
              <TableRow>
                <StyledTableCell className="th-block">
                  {parse(translate('pages.explorer.block'))}
                </StyledTableCell>
                <StyledTableCell>{parse(translate('pages.explorer.txId'))}</StyledTableCell>
                <StyledTableCell className="th-amount" align="right">
                  {parse(translate('pages.explorer.amount', { currency: getCurrencyName() }))}
                </StyledTableCell>
                <StyledTableCell className="th-recipents" align="right">
                  {parse(translate('pages.explorer.recipents'))}
                </StyledTableCell>
                <StyledTableCell className="th-amount" align="right">
                  {parse(translate('pages.explorer.tickets'))}
                </StyledTableCell>
                <StyledTableCell className="th-fee" align="right">
                  {parse(translate('pages.explorer.fee'))}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.size > 0 ? (
                Array.from(transactions.values()).map((tx: ITransaction) => {
                  const ticketsTypeList = getTicketsTypeList(tx.tickets || '');
                  return (
                    <StyledTableRow key={tx.id} className="table__row">
                      <StyledTableCell component="th" scope="row">
                        {generateBlockKeyValue(tx.blockHash || '', tx.block.height || '')}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Grid container alignItems="center" wrap="nowrap">
                          <CopyButton copyText={tx.id} />
                          <Link to={`${TRANSACTION_DETAILS}/${tx.id}`}>
                            <Typography noWrap title={tx.id} className="no-limit">
                              {formatAddress(tx.id)}
                            </Typography>
                          </Link>
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {tx.isNonStandard ? (
                          <Tooltip
                            title={translateDropdown('pages.explorer.shieldedTransactionTooltip')}
                          >
                            <span>{parse(translate('common.unknown'))}</span>
                          </Tooltip>
                        ) : (
                          <>{(+tx.totalAmount.toFixed(2)).toLocaleString('en')}</>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">{tx.recipientCount}</StyledTableCell>
                      <StyledTableCell align="right">
                        {tx.ticketsTotal === -1 ? (
                          <BlockStyles.HourglassWrapper>
                            <Hourglass />
                          </BlockStyles.HourglassWrapper>
                        ) : (
                          <div>
                            {ticketsTypeList.total > 0 ? (
                              <RouterLink
                                route={`${TRANSACTION_DETAILS}/${tx.id}`}
                                value={ticketsTypeList.total}
                                textSize="large"
                                title={ticketsTypeList.text.join(', <br />')}
                                isUseTooltip
                              />
                            ) : (
                              0
                            )}
                          </div>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">{tx.fee || '--'}</StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" colSpan={6} style={{ padding: 0 }}>
                    <Skeleton animation="wave" variant="rect" height={150} />
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Styles.BlockWrapper>
  );
}

export default memo(LatestTransactions);
