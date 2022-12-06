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
  const [isExpanded, setIsExpanded] = useState(false);
  if (!nftTicket) {
    return null;
  }
  const nft = JSON.parse(decode(nftTicket)) as INftTicket;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT Ticket Version:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.nft_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Author:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.author}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Block number:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
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
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Block hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
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
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Copies:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.copies}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Royalty:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.royalty}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Green:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.green?.toString()}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT collection txid:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.nft_collection_txid}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
        <AccordionSummary>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={2}>
              <Styles.TicketTitle>App ticket:</Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={10}>
              <Styles.TicketContent className="expand-more">
                {isExpanded ? 'Click to see less' : 'Click to see detail'} <ExpandMoreIcon />
              </Styles.TicketContent>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <AppTicket appTicket={nft.app_ticket} />
        </AccordionDetails>
      </Styles.Accordion>
    </Box>
  );
};

const NFTRegistrationTicket: React.FC<INFTRegistrationTicketProps> = ({ ticket }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Creator height:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
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
          <Styles.TicketContent>{ticket.key}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Label:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.label}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Total copies:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.total_copies}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Royalty:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.royalty}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Royalty address:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.royalty_address}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Green:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.green?.toString()}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Storage fee:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {ticket.storage_fee} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signatures={ticket.signatures} />
      <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
        <AccordionSummary>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={2}>
              <Styles.TicketTitle>NFT Ticket:</Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={10}>
              <Styles.TicketContent className="expand-more">
                {isExpanded ? 'Click to see less' : 'Click to see detail'} <ExpandMoreIcon />
              </Styles.TicketContent>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <NFTTicket nftTicket={ticket.nft_ticket} />
        </AccordionDetails>
      </Styles.Accordion>
    </Box>
  );
};

export default NFTRegistrationTicket;
