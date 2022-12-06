import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IOfferTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IOfferTicketProps {
  ticket: IOfferTicket;
}

const OfferTicket: React.FC<IOfferTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Version:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Pastel ID:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.pastelID}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signature={ticket.signature} />
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Item txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.item_txid}`}
              value={ticket.item_txid}
              title={ticket.item_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Copy number:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.copy_number}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Asked price:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {formatNumber(ticket.asked_price)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Valid after:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.valid_after}`}
              value={ticket.valid_after}
              title={ticket.valid_after?.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Valid before:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.valid_before}`}
              value={ticket.valid_before}
              title={ticket.valid_before?.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Locked recipient:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.locked_recipient}</Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfferTicket;
