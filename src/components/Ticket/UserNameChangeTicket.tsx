import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IUserNameChangeTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IUserNameChangeTicketProps {
  ticket: IUserNameChangeTicket;
}

const UserNameChangeTicket: React.FC<IUserNameChangeTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Username</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.username}</Styles.TicketContent>
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
          <Styles.TicketTitle>Fee</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            {formatNumber(ticket.ticket.fee)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserNameChangeTicket;
