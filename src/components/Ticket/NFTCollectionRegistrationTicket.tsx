import { decode } from 'js-base64';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INftCollectionRegistrationTicket, INftCollectionTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';
import { formatAddress } from '@utils/helpers/format';
import { translate } from '@utils/helpers/i18n';

import Signatures from './Signatures';
import AppTicket from './AppTicket';
import * as Styles from './Ticket.styles';

interface INFTCollectionRegistrationTicketProps {
  ticket: INftCollectionRegistrationTicket;
}

interface INFTCollectionTicketProps {
  nftTicket: string;
}

const NFTCollectionTicket: React.FC<INFTCollectionTicketProps> = ({ nftTicket }) => {
  if (!nftTicket) {
    return null;
  }

  const nft = JSON.parse(decode(nftTicket)) as INftCollectionTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate(
              'components.ticket.nftCollectionRegistrationTicket.nftCollectionTicketVersion',
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.nft_collection_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      {nft?.nft_collection_name ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.nftCollectionName')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{nft.nft_collection_name}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.creator')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
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
      {nft?.permitted_users?.length ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.permittedUsers')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{nft.permitted_users.join(', ')}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {nft?.blocknum ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.blockNum')}
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
              {translate('components.ticket.nftCollectionRegistrationTicket.blockHash')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${nft.block_hash}`}
                value={nft.block_hash}
                title={nft.block_hash?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.closingHeight')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.closing_height}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.nftMaxCount')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.nft_max_count}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.nftCopyCount')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.nft_copy_count}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.royalty')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft?.royalty || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.green')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft?.green?.toString() || 'false'}</Styles.TicketContent>
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
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.version')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
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
      {ticket?.permitted_users?.length ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.permittedUsers')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.permitted_users.join(', ')}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket.key ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.key')}
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
              {translate('components.ticket.nftCollectionRegistrationTicket.label')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.label}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket?.creator_height ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.creatorHeight')}
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
      {ticket?.closing_height ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.nftCollectionRegistrationTicket.closingHeight')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.closing_height}`}
                value={ticket.closing_height}
                title={ticket.closing_height?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.nftMaxCount')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.nft_max_count}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.nftCopyCount')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.nft_copy_count || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.royalty')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.royalty || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.royaltyAddress')}
          </Styles.TicketTitle>
        </Grid>
        {ticket?.royalty_address ? (
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.ADDRESS_DETAILS}/${ticket.royalty_address}`}
                value={ticket.royalty_address}
                title={ticket.royalty_address?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        ) : null}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.green')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.green?.toString() || 'false'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.nftCollectionRegistrationTicket.storageFee', {
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
              {translate('components.ticket.nftCollectionRegistrationTicket.timestamp')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatFullDate(ticket.transactionTime, { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <NFTCollectionTicket nftTicket={ticket.nft_collection_ticket} />
    </Box>
  );
};

export default NFTCollectionRegistrationTicket;
