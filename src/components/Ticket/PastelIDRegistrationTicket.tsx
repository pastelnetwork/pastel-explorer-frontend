import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formattedDate } from '@utils/helpers/date/date';
import { IPastelIDRegistrationTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IPastelIDRegistrationTicketProps {
  ticket: IPastelIDRegistrationTicket;
}

const PastelIDRegistrationTicket: React.FC<IPastelIDRegistrationTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>ID Type</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.id_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Version</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Pastel ID</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.pastelID}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signature={ticket.ticket.signature} />
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Address</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.ADDRESS_DETAILS}/${ticket.ticket.address}`}
              value={ticket.ticket.address}
              title={ticket.ticket.address}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>PQ key</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent className="break-all view-more">
            {ticket.ticket.pq_key.substring(0, 200)}...
            <RouterLink
              route="#"
              value="Click to see more"
              title="Click to see more"
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Timestamp</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            {formattedDate(Number(ticket.ticket.timeStamp))}
          </Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PastelIDRegistrationTicket;
