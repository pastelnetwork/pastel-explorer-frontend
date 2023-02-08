import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

import { Link } from '@components/Link/Link.styles';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import { formatAddress } from '@utils/helpers/format';
import { formatFullDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useTickets from '@hooks/useTickets';
import * as ExplorerStyles from '@pages/Explorer/Explorer.styles';

import { StyledTableCell, StyledTableRow } from './Tickets.helpers';

import * as Styles from './Tickets.styles';

const Sense: React.FC = () => {
  const { data, total, isLoading } = useTickets('sense', 10);
  return (
    <Styles.SenseContainer>
      <ExplorerStyles.BlockWrapper className="mt-24 latest-transactions-wrapper">
        <ExplorerStyles.BlockTitle className="latest-blocks">
          Sense tickets (Total {formatNumber(total)} tickets)
          <Link to={`${ROUTES.TICKETS_TYPE}/sense`} className="view-all">
            <Typography align="center" className="p-16">
              View all <ArrowForwardIos />
            </Typography>
          </Link>
        </ExplorerStyles.BlockTitle>
        <TableContainer component={Paper} className="table-container">
          <Table aria-label="customized table" className="custom-table latest-transactions">
            <TableHead className="table__row-header">
              <TableRow>
                <StyledTableCell>Block</StyledTableCell>
                <StyledTableCell>TXID</StyledTableCell>
                <StyledTableCell>Image Hash</StyledTableCell>
                <StyledTableCell>Fee</StyledTableCell>
                <StyledTableCell>Timestamp</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <StyledTableRow key={item.transactionHash} className="table__row">
                  <StyledTableCell component="td" scope="row">
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${item.height}`}
                      value={item.height}
                      title={item.height.toString()}
                      className="address-link"
                    />
                  </StyledTableCell>
                  <StyledTableCell component="td" scope="row">
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${item.transactionHash}`}
                      value={formatAddress(item.transactionHash, 12)}
                      title={item.transactionHash}
                      className="address-link"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    {item.imageHash ? (
                      <RouterLink
                        route={`${ROUTES.SENSE_DETAILS}/${item.transactionHash}/${item.imageHash}`}
                        value={formatAddress(item.imageHash, 12)}
                        title={item.imageHash}
                        className="address-link"
                      />
                    ) : (
                      '--'
                    )}
                  </StyledTableCell>
                  <StyledTableCell className="nowrap">
                    {item.fee} {getCurrencyName()}
                  </StyledTableCell>
                  <StyledTableCell className="nowrap">
                    {item.timestamp ? formatFullDate(item.timestamp) : '--'}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {!data.length && !isLoading ? (
                <StyledTableRow>
                  <StyledTableCell component="td" scope="row" colSpan={5} style={{ padding: 0 }}>
                    <Typography className="empty-label">Data not found</Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ) : null}
              {isLoading ? (
                <StyledTableRow>
                  <StyledTableCell component="td" scope="row" colSpan={6} style={{ padding: 0 }}>
                    <Skeleton animation="wave" variant="rect" height={150} />
                  </StyledTableCell>
                </StyledTableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </ExplorerStyles.BlockWrapper>
    </Styles.SenseContainer>
  );
};

export default Sense;
