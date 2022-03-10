// React
import { memo, useEffect } from 'react';
// third party
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// application
import { formattedDate } from '@utils/helpers/date/date';
import { TAppTheme } from '@theme/index';
import { BlockThunks } from '@redux/thunk';
import { AppThunkDispatch } from '@redux/types';
import { useBlockLatestBlocks } from '@redux/hooks/blocksHooks';
import Skeleton from '@material-ui/lab/Skeleton';
import * as ROUTES from '@utils/constants/routes';
import { Link } from '@components/Link/Link.styles';
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
  hashCell: {
    maxWidth: 250,
  },
  viewAll: {
    padding: 16,
  },
});

function LatestBlocks() {
  const classes = useStyles();
  const dispatch = useDispatch<AppThunkDispatch>();
  const latestBlocks = useBlockLatestBlocks();
  useEffect(() => {
    dispatch(BlockThunks.getLatestBlocks());
  }, []);

  return (
    <Styles.BlockWrapper className="mt-44">
      <Styles.BlockTitle>Latest Blocks (Live)</Styles.BlockTitle>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 44 }}>Block</StyledTableCell>
              <StyledTableCell>Hash</StyledTableCell>
              <StyledTableCell align="right">TXs</StyledTableCell>
              <StyledTableCell align="right">Size</StyledTableCell>
              <StyledTableCell align="right">Timestamp</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestBlocks && latestBlocks.size ? (
              Array.from(latestBlocks.values()).map(block => (
                <StyledTableRow key={block.id}>
                  <StyledTableCell component="th" scope="row">
                    {block.height || ''}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" style={{ maxWidth: 150 }}>
                    <Link to={`${ROUTES.BLOCK_DETAILS}/${block.id}`}>
                      <Typography noWrap title={block.id}>
                        {block.id}
                      </Typography>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{block.transactionCount}</StyledTableCell>
                  <StyledTableCell align="right" style={{ width: 44 }}>
                    {block.size.toLocaleString('en')}
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ maxWidth: 200 }}>
                    {formattedDate(block.timestamp)}
                  </StyledTableCell>
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
      <div>
        <Link to="/blocks">
          <Typography align="center" className={classes.viewAll}>{`View all >>`}</Typography>
        </Link>
      </div>
    </Styles.BlockWrapper>
  );
}

export default memo(LatestBlocks);
