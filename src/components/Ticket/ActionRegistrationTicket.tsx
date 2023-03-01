import { useState, ReactNode } from 'react';
import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import {
  IActionRegistrationTicket,
  IActionTicket,
  IActionActivationTicket,
  TTicketType,
} from '@utils/types/ITransactions';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formatAddress } from '@utils/helpers/format';
import RouterLink from '@components/RouterLink/RouterLink';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';

import ApiTicket from './ApiTicket';
import Signatures from './Signatures';
import { getTicketTitle } from './index';
import * as Styles from './Ticket.styles';

interface IActionRegistrationTicketProps {
  ticket: IActionRegistrationTicket;
  senseInfo?: ReactNode;
  showActivationTicket?: boolean;
}

interface IActionTicketProps {
  ticket: string;
  actionType: string;
}

const ActionTicket: React.FC<IActionTicketProps> = ({ ticket, actionType }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  if (!ticket) {
    return null;
  }
  const nft = JSON.parse(decode(ticket)) as IActionTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Action ticket version:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.action_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Action type:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.action_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Caller:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
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
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Block number:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
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
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Block hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
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
        <Styles.Accordion
          expanded={isExpanded}
          onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
        >
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>Api ticket:</Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded ? 'Hide detail' : 'Click to see detail'} <ExpandMoreIcon />
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

const ActionRegistrationTicket: React.FC<IActionRegistrationTicketProps> = ({
  ticket,
  senseInfo,
  showActivationTicket,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderActivationTicket = () => {
    if (!showActivationTicket || !ticket.activationTicket) {
      return null;
    }

    const activationTicket = ticket.activationTicket.data.ticket as IActionActivationTicket;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} className="max-w-355">
          <Styles.TicketTitle>Action Activation Ticket Detail:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">TXID:</Styles.TicketTitle>
              <Styles.TicketContent>
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.activationTicket.transactionHash}`}
                  value={ticket.activationTicket.transactionHash}
                  title={ticket.activationTicket.transactionHash}
                  className="address-link small"
                />
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">Type:</Styles.TicketTitle>
              <Styles.TicketContent>
                {getTicketTitle(ticket.activationTicket.type as TTicketType)}
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                Pastel Block Height When Ticket Registered:
              </Styles.TicketTitle>
              <Styles.TicketContent>
                {ticket.called_at ? (
                  <RouterLink
                    route={`${ROUTES.BLOCK_DETAILS}/${activationTicket.called_at}`}
                    value={activationTicket.called_at}
                    title={activationTicket.called_at?.toString()}
                    className="address-link small"
                  />
                ) : (
                  'NA'
                )}
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                Pastel OpenAPI Ticket Version Number:
              </Styles.TicketTitle>
              <Styles.TicketContent>{activationTicket.version}</Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">Pastel ID:</Styles.TicketTitle>
              <Styles.TicketContent>
                <RouterLink
                  route={`${ROUTES.PASTEL_ID_DETAILS}/${activationTicket.pastelID}`}
                  value={activationTicket.pastelID}
                  title={activationTicket.pastelID}
                  className="address-link pastel"
                />
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">Reg txid:</Styles.TicketTitle>
              <Styles.TicketContent>
                {activationTicket.reg_txid ? (
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${activationTicket.reg_txid}`}
                    value={activationTicket.reg_txid}
                    title={activationTicket.reg_txid}
                    className="address-link small"
                  />
                ) : (
                  'NA'
                )}
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                Total Cost in PSL to Register Ticket on Blockchain:
              </Styles.TicketTitle>
              <Styles.TicketContent>
                {formatNumber(activationTicket.storage_fee)} {getCurrencyName()}
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          {activationTicket.transactionTime ? (
            <Grid container spacing={3}>
              <Styles.ActivationTicketItem className="item">
                <Styles.TicketTitle className="mr-5">Timestamp:</Styles.TicketTitle>
                <Styles.TicketContent>
                  {formatFullDate(activationTicket.transactionTime, { dayName: false })}
                </Styles.TicketContent>
              </Styles.ActivationTicketItem>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Action type:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.action_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Status:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.StatusWrapper className="item">
            <Styles.ActionRegistrationTicketStatus
              className={ticket?.activation_ticket ? 'active' : ''}
            >
              {ticket?.activation_ticket ? 'Activated' : 'Not Yet Activated'}
            </Styles.ActionRegistrationTicketStatus>
            {ticket?.activation_ticket && ticket?.activation_txId ? (
              <Styles.TicketContent>
                (Activation TXID:{' '}
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${ticket?.activation_txId}`}
                  value={formatAddress(ticket.activation_txId, 10, -3)}
                  title={ticket.activation_txId}
                  className="address-link"
                />
                )
              </Styles.TicketContent>
            ) : null}
          </Styles.StatusWrapper>
        </Grid>
      </Grid>
      {senseInfo}
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
          <Styles.TicketTitle>Key:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.key || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>TXID of Preburn 20%:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.label || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>Pastel Block Height When Ticket Registered:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
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
        <Grid item xs={4} sm={3} className="max-w-355">
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
      <Signatures signatures={ticket.signatures} />
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>Timestamp:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatFullDate(ticket.transactionTime, { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket.action_ticket ? (
        <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>Action ticket:</Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded ? 'Hide detail' : 'Click to see detail'} <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ActionTicket ticket={ticket.action_ticket} actionType={ticket.action_type} />
          </AccordionDetails>
        </Styles.Accordion>
      ) : null}
      {renderActivationTicket()}
    </Box>
  );
};

export default ActionRegistrationTicket;
