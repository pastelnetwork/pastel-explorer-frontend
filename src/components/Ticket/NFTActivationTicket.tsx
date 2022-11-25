import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INftActivationTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface INFTActivationTicketProps {
  ticket: INftActivationTicket;
}

const NFTActivationTicket: React.FC<INFTActivationTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Creator height</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.ticket.creator_height}`}
              value={ticket.ticket.creator_height}
              title={ticket.ticket.creator_height.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
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
          <Styles.TicketTitle>Reg txid</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.ticket.reg_txid}`}
              value={ticket.ticket.reg_txid}
              title={ticket.ticket.reg_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Storage fee</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            {formatNumber(ticket.ticket.storage_fee)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NFTActivationTicket;
