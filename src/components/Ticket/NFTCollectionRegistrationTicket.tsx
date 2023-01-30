import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INftCollectionRegistrationTicket, INftCollectionTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';

import Signatures from './Signatures';
import AppTicket from './AppTicket';
import * as Styles from './Ticket.styles';

interface INFTCollectionRegistrationTicketProps {
  ticket: INftCollectionRegistrationTicket;
}

interface INFTcollectionTicketProps {
  nftTicket: string;
}

const NFTcollectionTicket: React.FC<INFTcollectionTicketProps> = ({ nftTicket }) => {
  if (!nftTicket) {
    return null;
  }

  const nft = JSON.parse(decode(nftTicket)) as INftCollectionTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT collection ticket version:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.nft_collection_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT collection name:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.nft_collection_name || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Creator:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${nft.creator}`}
              value={nft.creator}
              title={nft.creator}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Permitted users:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {nft.permitted_users ? nft.permitted_users.join(', ') : 'NA'}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Blocknum:</Styles.TicketTitle>
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
                title={nft.block_hash?.toString()}
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
          <Styles.TicketTitle>Closing height:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.closing_height}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT max count:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.nft_max_count}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT copy count:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{nft.nft_copy_count}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>royalty:</Styles.TicketTitle>
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
      <AppTicket appTicket={nft.app_ticket} />
    </Box>
  );
};

const NFTCollectionRegistrationTicket: React.FC<INFTCollectionRegistrationTicketProps> = ({
  ticket,
}) => {
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
          <Styles.TicketTitle>Permitted users:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {ticket.permitted_users ? ticket.permitted_users.join(', ') : 'NA'}
          </Styles.TicketContent>
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
          <Styles.TicketTitle>Creator height:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
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
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Closing height:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {ticket.closing_height ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.closing_height}`}
                value={ticket.closing_height}
                title={ticket.closing_height?.toString()}
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
          <Styles.TicketTitle>NFT max count:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.nft_max_count}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>NFT copy count:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.nft_copy_count}</Styles.TicketContent>
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
          <Styles.TicketContent>
            {ticket.royalty_address ? (
              <RouterLink
                route={`${ROUTES.ADDRESS_DETAILS}/${ticket.royalty_address}`}
                value={ticket.royalty_address}
                title={ticket.royalty_address?.toString()}
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
          <Styles.TicketTitle>Green:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>{ticket.green?.toString()}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>
            Total Cost in PSL to Register Ticket on Blockchain:
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent>
            {formatNumber(ticket.storage_fee)} {getCurrencyName()}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signatures={ticket.signatures} />
      <NFTcollectionTicket nftTicket={ticket.nft_collection_ticket} />
    </Box>
  );
};

export default NFTCollectionRegistrationTicket;
