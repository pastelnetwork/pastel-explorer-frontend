import { memo, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { TAppTheme } from '@theme/index';
import { generateBlockKeyValue } from '@pages/Explorer/LatestTransactions/LatestTransactions.helpers';
import Skeleton from '@material-ui/lab/Skeleton';
import { TransactionThunks } from '@redux/thunk';
import { AppThunkDispatch } from '@redux/types';
import { useTransactionLatestTransactions } from '@redux/hooks/transactionsHooks';
import { ITransaction } from '@utils/types/ITransactions';

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
  table: {
    minWidth: 700,
  },
});

function LatestTransactions() {
  const dispatch = useDispatch<AppThunkDispatch>();
  const transactions = useTransactionLatestTransactions();
  useEffect(() => {
    dispatch(TransactionThunks.getLatestBlocks());
  }, []);

  const classes = useStyles();
  return (
    <div>
      <h4>Latest Transactions (Live)</h4>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Block</StyledTableCell>
              <StyledTableCell>TXID</StyledTableCell>
              <StyledTableCell align="right">Amount(PSL)</StyledTableCell>
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
                  <StyledTableCell component="th" scope="row" style={{ maxWidth: 250 }}>
                    <Typography noWrap>{tx.id}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(+tx.totalAmount.toFixed(2)).toLocaleString('en')}
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
    </div>
  );
}

export default memo(LatestTransactions);
