import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { IActionRegistrationTicket, IActionTicket } from '@utils/types/ITransactions';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import RouterLink from '@components/RouterLink/RouterLink';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';

import AppTicket from './AppTicket';
import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IActionRegistrationTicketProps {
  ticket: IActionRegistrationTicket;
}

interface IActionTicketProps {
  ticket: string;
}

const ActionTicket: React.FC<IActionTicketProps> = ({ ticket }) => {
  const nft = JSON.parse(decode(ticket)) as IActionTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Action ticket version</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.action_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Action type</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.action_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Caller</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route="#"
              value={nft.caller}
              title={nft.caller.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Block number</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${nft.blocknum}`}
              value={nft.blocknum}
              title={nft.blocknum.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Block hash</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${nft.block_hash}`}
              value={nft.block_hash}
              title={nft.block_hash}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <AppTicket appTicket={nft.app_ticket} />
    </Box>
  );
};

const ActionRegistrationTicket: React.FC<IActionRegistrationTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Action type</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.action_type}</Styles.TicketContent>
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
          <Styles.TicketTitle>Key</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.key}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Label</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.label}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Called at</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.ticket.called_at}`}
              value={ticket.ticket.called_at}
              title={ticket.ticket.called_at.toString()}
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
      <Signatures signatures={ticket.ticket.signatures} />
      <div style={{ display: 'none' }}>
        <ActionTicket ticket={ticket.ticket.action_ticket} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Action ticket</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <RouterLink
            route="#"
            value="Click to see detail"
            title="Click to see detail"
            className="address-link"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActionRegistrationTicket;
