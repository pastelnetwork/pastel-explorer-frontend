import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import * as Styles from './Ticket.styles';

interface IAppTicketProps {
  appTicket: string;
}

const AppTicket: React.FC<IAppTicketProps> = ({ appTicket }) => {
  if (!appTicket) {
    return null;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>App ticket</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent className="break-all">
            {appTicket.substring(0, 100)}
          </Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppTicket;
