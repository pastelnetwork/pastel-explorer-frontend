import { useState } from 'react';
import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import RouterLink from '@components/RouterLink/RouterLink';
import { INftRegistrationTicket, INftTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formatAddress } from '@utils/helpers/format';
import { formatFullDate } from '@utils/helpers/date/date';
import { translate } from '@utils/helpers/i18n';

import Signatures from './Signatures';
import AppTicket from './AppTicket';
import * as Styles from './Ticket.styles';

interface INFTRegistrationTicketProps {
  ticket: INftRegistrationTicket;
}

interface INFTTicketProps {
  nftTicket: string;
}

const NFTTicket: React.FC<INFTTicketProps> = ({ nftTicket }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  if (!nftTicket) {
    return null;
  }
  const nft = JSON.parse(decode(nftTicket)) as INftTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.nftTicketVersion')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.nft_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.author')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${nft.author}`}
              value={nft.author}
              title={nft.author}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      {nft?.blocknum ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.blockNum')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${nft.blocknum}`}
                value={nft.blocknum}
                title={nft.blocknum?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {nft?.block_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.blockHash')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
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
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.copies')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft?.copies || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.royalty')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft?.royalty || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.green')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft?.green?.toString() || 'false'}</Styles.TicketContent>
        </Grid>
      </Grid>
      {nft?.nft_collection_txid ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.nftCollectionTxId')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{nft.nft_collection_txid}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {nft.app_ticket ? (
        <Styles.Accordion
          expanded={isExpanded}
          onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
        >
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.nftRegistrationTicket.appTicket')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded
                    ? translate('components.ticket.nftRegistrationTicket.hideDetail')
                    : translate('components.ticket.nftRegistrationTicket.clickToSeeDetail')}{' '}
                  <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <AppTicket appTicket={nft.app_ticket} />
          </AccordionDetails>
        </Styles.Accordion>
      ) : null}
    </Box>
  );
};

const NFTRegistrationTicket: React.FC<INFTRegistrationTicketProps> = ({ ticket }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box>
      {ticket?.activation_ticket ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.actionRegistrationTicket.status')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.StatusWrapper className="item">
              <Styles.ActionRegistrationTicketStatus
                className={ticket?.activation_ticket ? 'active' : ''}
              >
                {ticket?.activation_ticket
                  ? translate('components.ticket.actionRegistrationTicket.activated')
                  : translate('components.ticket.actionRegistrationTicket.notYetActivated')}
              </Styles.ActionRegistrationTicketStatus>
              {ticket?.activation_ticket && ticket?.activation_txId ? (
                <Styles.TicketContent>
                  ({translate('components.ticket.actionRegistrationTicket.activationTXID')}{' '}
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
      ) : null}
      {ticket?.creator_height ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.creatorHeight')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.creator_height}`}
                value={ticket.creator_height}
                title={ticket.creator_height?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.version')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket?.key ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.key')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.key}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket?.label ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.label')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.label}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.totalCopies')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.total_copies || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.royalty')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.royalty || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket?.royalty_address ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.royaltyAddress')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.royalty_address}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.green')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.green?.toString() || 'false'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftRegistrationTicket.storageFee', {
              currency: getCurrencyName(),
            })}
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
            <Styles.TicketTitle>
              {translate('components.ticket.nftRegistrationTicket.timestamp')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatFullDate(ticket.transactionTime, { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket.nft_ticket ? (
        <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.nftRegistrationTicket.nftTicket')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded
                    ? translate('components.ticket.nftRegistrationTicket.hideDetail')
                    : translate('components.ticket.nftRegistrationTicket.clickToSeeDetail')}{' '}
                  <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <NFTTicket nftTicket={ticket.nft_ticket} />
          </AccordionDetails>
        </Styles.Accordion>
      ) : null}
    </Box>
  );
};

export default NFTRegistrationTicket;
