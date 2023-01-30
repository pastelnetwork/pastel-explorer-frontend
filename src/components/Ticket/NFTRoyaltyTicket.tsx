import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { INftRoyaltyTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface INFTRoyaltyTicketProps {
  ticket: INftRoyaltyTicket;
}

const NFTRoyaltyTicket: React.FC<INFTRoyaltyTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Pastel OpenAPI Ticket Version Number:</Styles.TicketTitle>
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
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>New PastelID:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.new_pastelID}`}
              value={ticket.new_pastelID}
              title={ticket.new_pastelID}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {ticket.nft_txid ? (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.nft_txid}`}
                value={ticket.nft_txid}
                title={ticket.nft_txid}
                className="address-link"
              />
            ) : (
              'NA'
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NFTRoyaltyTicket;
