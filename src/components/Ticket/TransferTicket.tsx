import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { ITransferTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface ITransferTicketProps {
  ticket: ITransferTicket;
}

const TransferTicket: React.FC<ITransferTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Pastel OpenAPI Ticket Version Number:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Pastel ID:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.pastelID}`}
              value={ticket.pastelID}
              title={ticket.pastelID}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signature={ticket.signature} />
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Offer txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.offer_txid}`}
              value={ticket.offer_txid}
              title={ticket.offer_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Accept txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.accept_txid}`}
              value={ticket.accept_txid}
              title={ticket.accept_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Item txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.item_txid || ticket.nft_txid}`}
              value={ticket.item_txid || ticket.nft_txid}
              title={ticket.item_txid || ticket.nft_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Registration txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.registration_txid}`}
              value={ticket.registration_txid}
              title={ticket.registration_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Copy serial nr:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.copy_serial_nr}</Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>Timestamp:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{formatFullDate(ticket.transactionTime)}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default TransferTicket;
