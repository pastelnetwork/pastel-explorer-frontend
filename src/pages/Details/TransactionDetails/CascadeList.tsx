import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { TCascadeRequests } from '@utils/types/ITransactions';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';

import * as TableStyles from '@components/Table/Table.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as BlockStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as Styles from './TransactionDetails.styles';

interface ICascadeList {
  data: TCascadeRequests[];
}

interface ICascadeItem {
  cascade: TCascadeRequests;
}

const CascadeItem: React.FC<ICascadeItem> = ({ cascade }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <TicketStyles.TicketTitle>Cascade ID:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <TicketStyles.TicketContent>
            {cascade.cascadeId.indexOf('nocascade') === -1 ? (
              <RouterLink
                route={`${ROUTES.CASCADE_DETAILS}/${cascade.cascadeId}`}
                value={cascade.cascadeId}
                title={cascade.cascadeId}
                className="address-link"
              />
            ) : (
              <RouterLink
                route={`${ROUTES.CASCADE_DETAILS}/${cascade.cascadeId}`}
                value={cascade.cascadeId}
                title={cascade.cascadeId}
                className="address-link"
              />
            )}
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
    </>
  );
};

const CascadeList: React.FC<ICascadeList> = ({ data }) => {
  return (
    <BlockStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-0">
        <TableStyles.BlockTitle>Cascades</TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          {data.map(cascade => (
            <Styles.GridStyle item key={cascade.cascadeId} className="table__row">
              <CascadeItem cascade={cascade} />
            </Styles.GridStyle>
          ))}
        </Box>
      </TableStyles.BlockWrapper>
    </BlockStyles.GridStyle>
  );
};

export default CascadeList;
