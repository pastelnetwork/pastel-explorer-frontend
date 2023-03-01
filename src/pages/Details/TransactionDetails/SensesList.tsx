import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { TSenseRequests } from '@utils/types/ITransactions';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';

import * as TableStyles from '@components/Table/Table.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as BlockStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as Styles from './TransactionDetails.styles';

interface ISensesList {
  data: TSenseRequests[];
}

interface ISenseItem {
  sense: TSenseRequests;
}

const SenseItem: React.FC<ISenseItem> = ({ sense }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>Image Hash:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent>
            {sense.imageFileHash.indexOf('nosense') === -1 ? (
              <RouterLink
                route={`${ROUTES.SENSE_DETAILS}?txid=${sense.transactionHash}&hash=${sense.imageFileHash}`}
                value={sense.imageFileHash}
                title={sense.imageFileHash}
                className="address-link"
              />
            ) : (
              ''
            )}
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>Sense Version:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent>
            {sense.imageFileHash.indexOf('nosense') === -1 ? sense.dupeDetectionSystemVersion : ''}
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
    </>
  );
};

const SensesList: React.FC<ISensesList> = ({ data }) => {
  return (
    <BlockStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-0">
        <TableStyles.BlockTitle>Senses</TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          {data.map(sense => (
            <Styles.GridStyle item key={sense.imageFileHash} className="table__row">
              <SenseItem sense={sense} />
            </Styles.GridStyle>
          ))}
        </Box>
      </TableStyles.BlockWrapper>
    </BlockStyles.GridStyle>
  );
};

export default SensesList;
