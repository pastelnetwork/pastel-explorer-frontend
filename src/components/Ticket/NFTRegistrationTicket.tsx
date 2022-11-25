import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
  const nft = JSON.parse(decode(nftTicket)) as INftTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>NFT Ticket Version</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.nft_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Author</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`#/${nft.author}`}
              value={nft.author}
              title={nft.author}
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
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Copies</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.copies}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Royalty</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.royalty}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Green</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.green.toString()}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>NFT collection txid</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{nft.nft_collection_txid}</Styles.TicketContent>
        </Grid>
      </Grid>
      <AppTicket appTicket={nft.app_ticket} />
    </Box>
  );
};

const NFTRegistrationTicket: React.FC<INFTRegistrationTicketProps> = ({ ticket }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Creator height</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.ticket.creator_height}`}
              value={ticket.ticket.creator_height}
              title={ticket.ticket.creator_height.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
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
          <Styles.TicketTitle>Total copies</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.total_copies}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Royalty</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.royalty}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Royalty address</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.royalty_address}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Green</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>{ticket.ticket.green.toString()}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>Storage fee</Styles.TicketTitle>
        </Grid>
        <Grid item xs={9}>
          <Styles.TicketContent>
            {ticket.ticket.storage_fee} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signatures={ticket.ticket.signatures} />
      <div style={{ display: 'none' }}>
        <NFTTicket nftTicket={ticket.ticket.nft_ticket} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Styles.TicketTitle>NFT Ticket</Styles.TicketTitle>
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

export default NFTRegistrationTicket;
