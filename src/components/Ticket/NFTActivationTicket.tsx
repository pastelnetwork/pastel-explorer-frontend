import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INftActivationTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface INFTActivationTicketProps {
  ticket: INftActivationTicket;
}

const NFTActivationTicket: React.FC<INFTActivationTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-370">
          <Styles.TicketTitle>Creator height:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket.creator_height ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.creator_height}`}
                value={ticket.creator_height}
                title={ticket.creator_height?.toString()}
                className="address-link"
              />
            ) : (
              'NA'
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-370">
          <Styles.TicketTitle>Pastel OpenAPI Ticket Version Number:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-370">
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
        <Grid item xs={4} sm={3} className="max-w-370">
          <Styles.TicketTitle>Reg txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket.reg_txid ? (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.reg_txid}`}
                value={ticket.reg_txid}
                title={ticket.reg_txid}
                className="address-link"
              />
            ) : (
              'NA'
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-370">
          <Styles.TicketTitle>
            Total Cost in PSL to Register Ticket on Blockchain:
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {formatNumber(ticket.storage_fee)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-370">
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

export default NFTActivationTicket;
