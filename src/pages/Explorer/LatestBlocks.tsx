// React
import { memo, useEffect, useState } from 'react';
// third party
import { withStyles, makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowForwardIos } from '@mui/icons-material';
import parse from 'html-react-parser';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// application
import { formattedDate } from '@utils/helpers/date/date';
import { TAppTheme } from '@theme/index';
import { BlockThunks } from '@redux/thunk';
import { AppThunkDispatch } from '@redux/types';
import { useBlockLatestBlocks } from '@redux/hooks/blocksHooks';
import Skeleton from '@mui/material/Skeleton';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import { useShowLess } from '@pages/Tickets/Tickets.helpers';
import MinedIcon from '@pages/Details/BlockDetails/MinedIcon';

import { Link } from '@components/Link/Link.styles';
import RouterLink from '@components/RouterLink/RouterLink';
import { formatAddress } from '@utils/helpers/format';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
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
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);
  const classes = useStyles();
  const dispatch = useDispatch<AppThunkDispatch>();
  const latestBlocks = useBlockLatestBlocks();

  useEffect(() => {
    dispatch(BlockThunks.getLatestBlocks());
  }, []);

  return (
    <Styles.BlockWrapper className="mt-24 latest-blocks-wrapper">
      <Styles.BlockTitle className="latest-blocks">
        <span>{parse(translate('pages.explorer.latestBlocksLive'))}</span>
        <Styles.LinkWrapper>
          <Link to="/blocks" className="view-all">
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
          <Table aria-label="customized table" className="custom-table latest-blocks">
            <TableHead>
              <TableRow className="table__row-header">
                <StyledTableCell className="th-block">
                  {parse(translate('pages.explorer.block'))}{' '}
                </StyledTableCell>
                <StyledTableCell>{parse(translate('pages.explorer.hash'))}</StyledTableCell>
                <StyledTableCell align="right" className="th-txs">
                  {parse(translate('pages.explorer.txs'))}
                </StyledTableCell>
                <StyledTableCell align="right" className="th-size">
                  {parse(translate('pages.explorer.size'))}
                </StyledTableCell>
                <StyledTableCell align="right" className="th-timestamp">
                  {parse(translate('pages.explorer.timestamp'))}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestBlocks && latestBlocks.size ? (
                Array.from(latestBlocks.values()).map(block => (
                  <StyledTableRow key={block.id} className="table__row">
                    <StyledTableCell component="th" scope="row">
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        <RouterLink
                          route={`${ROUTES.BLOCK_DETAILS}/${block.height}`}
                          value={block.height || ''}
                        />
                        <MinedIcon type={block.type || ''} />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Link to={`${ROUTES.BLOCK_DETAILS}/${block.id}`}>
                        <Typography noWrap title={block.id} className="no-limit">
                          {formatAddress(block.id)}
                        </Typography>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">{block.transactionCount}</StyledTableCell>
                    <StyledTableCell align="right">
                      {formatNumber(block.size / 1024, { decimalsLength: 2 })}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="whitespace-nowrap">
                      {formattedDate(block.timestamp, { dayName: false })}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" colSpan={5} style={{ padding: 0 }}>
                    <Skeleton animation="wave" variant="rectangular" height={150} />
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

export default memo(LatestBlocks);
