import { useState } from 'react';
import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { IActionRegistrationTicket, IActionTicket } from '@utils/types/ITransactions';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import RouterLink from '@components/RouterLink/RouterLink';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';

import ApiTicket from './ApiTicket';
import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IActionRegistrationTicketProps {
  ticket: IActionRegistrationTicket;
}

interface IActionTicketProps {
  ticket: string;
  actionType: string;
}

const ActionTicket: React.FC<IActionTicketProps> = ({ ticket, actionType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!ticket) {
    return null;
  }
  const nft = JSON.parse(decode(ticket)) as IActionTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Action ticket version:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.action_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Action type:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.action_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Caller:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${nft.caller}`}
              value={nft.caller}
              title={nft.caller}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Block number:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {nft.blocknum ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${nft.blocknum}`}
                value={nft.blocknum}
                title={nft.blocknum?.toString()}
                className="address-link"
              />
            ) : (
              'NA'
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Block hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {nft.block_hash ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${nft.block_hash}`}
                value={nft.block_hash}
                title={nft.block_hash}
                className="address-link"
              />
            ) : (
              'NA'
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      {nft.api_ticket ? (
        <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={2}>
                <Styles.TicketTitle>Api ticket:</Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={10}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded ? 'Click to see less' : 'Click to see detail'} <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ApiTicket apiTicket={nft.api_ticket} actionType={actionType} />
          </AccordionDetails>
        </Styles.Accordion>
      ) : null}
    </Box>
  );
};

const ActionRegistrationTicket: React.FC<IActionRegistrationTicketProps> = ({ ticket }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Action type:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.action_type}</Styles.TicketContent>
        </Grid>
      </Grid>
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
          <Styles.TicketTitle>Key:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.key || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Label:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.label || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Called at:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {ticket.called_at ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.called_at}`}
                value={ticket.called_at}
                title={ticket.called_at?.toString()}
                className="address-link"
              />
            ) : (
              'NA'
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Storage fee:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {formatNumber(ticket.storage_fee)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signatures={ticket.signatures} />
      {ticket.action_ticket ? (
        <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={2}>
                <Styles.TicketTitle>Action ticket:</Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={10}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded ? 'Click to see less' : 'Click to see detail'} <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ActionTicket ticket={ticket.action_ticket} actionType={ticket.action_type} />
          </AccordionDetails>
        </Styles.Accordion>
      ) : null}
    </Box>
  );
};

export default ActionRegistrationTicket;
