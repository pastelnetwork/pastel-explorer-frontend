import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IAcceptTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IAcceptTicketProps {
  ticket: IAcceptTicket;
}

const AcceptTicket: React.FC<IAcceptTicketProps> = ({ ticket }) => {
  return (
    <Box>
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
          <Styles.TicketTitle>Offer txid</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.ticket.offer_txid}`}
              value={ticket.ticket.offer_txid}
              title={ticket.ticket.offer_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Price</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            {formatNumber(ticket.ticket.price)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AcceptTicket;
