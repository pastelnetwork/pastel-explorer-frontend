// React
import { memo, useEffect } from 'react';
// third party
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch } from 'react-redux';
// application
import { TAppTheme } from '@theme/index';
import { generateBlockKeyValue } from '@pages/Explorer/LatestTransactions/LatestTransactions.helpers';
import { TransactionThunks } from '@redux/thunk';
import { AppThunkDispatch } from '@redux/types';
import { useTransactionLatestTransactions } from '@redux/hooks/transactionsHooks';
import { ITransaction } from '@utils/types/ITransactions';
import { TRANSACTION_DETAILS } from '@utils/constants/routes';
import { Link } from '@components/Link/Link.styles';
import { getCurrencyName } from '@utils/appInfo';
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

function LatestTransactions() {
  const dispatch = useDispatch<AppThunkDispatch>();
  const transactions = useTransactionLatestTransactions();
  useEffect(() => {
    dispatch(TransactionThunks.getLatestBlocks());
  }, []);

  return (
    <Styles.BlockWrapper className="mt-44">
      <Styles.BlockTitle>Latest Transactions (Live)</Styles.BlockTitle>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Block</StyledTableCell>
              <StyledTableCell>TXID</StyledTableCell>
              <StyledTableCell align="right">Amount({getCurrencyName()})</StyledTableCell>
              <StyledTableCell align="right">Recipents</StyledTableCell>
              <StyledTableCell align="right">Fee</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.size > 0 ? (
              Array.from(transactions.values()).map((tx: ITransaction) => (
                <StyledTableRow key={tx.id}>
                  <StyledTableCell component="th" scope="row">
                    {generateBlockKeyValue(tx.blockHash || '', tx.block.height || '')}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" style={{ maxWidth: 230 }}>
                    <Link to={`${TRANSACTION_DETAILS}/${tx.id}`}>
                      <Typography noWrap title={tx.id}>
                        {tx.id}
                      </Typography>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tx.isNonStandard ? (
                      <Tooltip title="Because the transaction is shielded, the amount sent is unknown.">
                        <span>Unknown</span>
                      </Tooltip>
                    ) : (
                      <>{(+tx.totalAmount.toFixed(2)).toLocaleString('en')}</>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">{tx.recipientCount}</StyledTableCell>
                  <StyledTableCell align="right">{tx.fee || '--'}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={5} style={{ padding: 0 }}>
                  <Skeleton animation="wave" variant="rect" height={150} />
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Styles.BlockWrapper>
  );
}

export default memo(LatestTransactions);
