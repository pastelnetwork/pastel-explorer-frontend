import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import { INftRoyaltyTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';
import { translate } from '@utils/helpers/i18n';
import CopyButton from '@components/CopyButton/CopyButton';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface INFTRoyaltyTicketProps {
  ticket: INftRoyaltyTicket;
}

const NFTRoyaltyTicket: React.FC<INFTRoyaltyTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftRoyaltyTicket.version'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftRoyaltyTicket.pastelID'))}
          </Styles.TicketTitle>
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
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftRoyaltyTicket.newPastelID'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
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
      {ticket?.nft_txid ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.nftRoyaltyTicket.nftTxId'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent className="nowrap">
              <CopyButton copyText={ticket.nft_txid} />
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.nft_txid}`}
                value={ticket.nft_txid}
                title={ticket.nft_txid}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.nftRoyaltyTicket.timestamp'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatFullDate(ticket.transactionTime, { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default NFTRoyaltyTicket;
