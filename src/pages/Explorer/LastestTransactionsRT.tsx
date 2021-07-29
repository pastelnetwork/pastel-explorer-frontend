import { memo, useContext, useState, useEffect } from 'react';
// import Table, { RowsProps } from '@components/Table/Table';
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
import { SocketContext } from '@context/socket';
import { IRawTransactions } from '@utils/types/ITransactions';
import { ISocketData } from '@utils/types/ISocketData';
import { generateBlockKeyValue } from '@pages/Explorer/LatestTransactions/LatestTransactions.helpers';
import { setTransactionsLive } from '@utils/helpers/statisticsLib';
import Skeleton from '@material-ui/lab/Skeleton';
import { BlockThunks } from '@redux/thunk';
import { AppThunkDispatch } from '@redux/types';

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

type ITransactionState = IRawTransactions & { pslPrice: number; recepients: number };

function LastestTransactions() {
  const dispatch = useDispatch<AppThunkDispatch>();
  const socket = useContext(SocketContext);
  const [txs, setTxs] = useState<Map<string, ITransactionState>>(new Map());
  useEffect(() => {
    socket.on(
      'getUpdateBlock',
      ({ unconfirmedTransactions = [], rawTransactions = [], blocks = [] }: ISocketData) => {
        if (
          (unconfirmedTransactions && unconfirmedTransactions.length) ||
          (rawTransactions && rawTransactions.length)
        ) {
          if (blocks.length) {
            dispatch(BlockThunks.updateBlocksNewest(blocks[0]));
          }
          setTxs(prev =>
            setTransactionsLive(prev, { unconfirmedTransactions, rawTransactions, blocks }),
          );
        }
      },
    );
    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);

  const classes = useStyles();
  return (
    <div>
      <h4>Lastest Transactions (Live)</h4>
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
            {txs.size > 0 ? (
              Array.from(txs.values()).map((tx: ITransactionState) => (
                <StyledTableRow key={tx.txid}>
                  <StyledTableCell component="th" scope="row">
                    {generateBlockKeyValue(tx.blockhash || '', tx.height || '')}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" style={{ maxWidth: 250 }}>
                    <Typography noWrap>{tx.txid}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tx.pslPrice.toLocaleString('en')}
                  </StyledTableCell>
                  <StyledTableCell align="right">{tx.recepients}</StyledTableCell>
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

export default memo(LastestTransactions);
