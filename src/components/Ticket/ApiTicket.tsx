import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { decode } from '@utils/helpers/ascii85';
import { IApiTicket } from '@utils/types/ITransactions';

import * as Styles from './Ticket.styles';

interface IApiTicketProps {
  apiTicket: string;
  actionType: string;
}

const ApiTicket: React.FC<IApiTicketProps> = ({ apiTicket, actionType }) => {
  if (!apiTicket) {
    return null;
  }
  const data = decode(apiTicket) as IApiTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-370">
          <Styles.TicketTitle>Data hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.data_hash || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      {actionType === 'sense' ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-370">
              <Styles.TicketTitle>Dd and fingerprints max:</Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Styles.TicketContent>{data.dd_and_fingerprints_max}</Styles.TicketContent>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-370">
              <Styles.TicketTitle>Dd and fingerprints ic:</Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Styles.TicketContent>{data.dd_and_fingerprints_ic}</Styles.TicketContent>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-370">
              <Styles.TicketTitle>Dd and fingerprints ids:</Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Styles.TicketContent>
                {data.dd_and_fingerprints_ids ? data.dd_and_fingerprints_ids.join(', ') : 'NA'}
              </Styles.TicketContent>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Box>
  );
};

export default ApiTicket;
