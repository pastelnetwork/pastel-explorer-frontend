import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INftCollectionRegistrationTicket } from '@utils/types/ITransactions';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';
import { formatAddress } from '@utils/helpers/format';
import { translate } from '@utils/helpers/i18n';

import { useStorageFee } from './Ticket.helpers';
import Signatures from './Signatures';
import AppTicket from './AppTicket';
import * as Styles from './Ticket.styles';

interface INFTCollectionRegistrationTicketProps {
  ticket: INftCollectionRegistrationTicket;
}

const NFTCollectionRegistrationTicket: React.FC<INFTCollectionRegistrationTicketProps> = ({
  ticket,
}) => {
  const { storageFee } = useStorageFee(ticket?.storage_fee);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftCollectionRegistrationTicket.version'))}
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
              {parse(translate('components.ticket.actionRegistrationTicket.status'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.StatusWrapper className="item">
              <Styles.ActionRegistrationTicketStatus
                className={ticket?.activation_ticket ? 'active' : ''}
              >
                {ticket?.activation_ticket
                  ? parse(translate('components.ticket.actionRegistrationTicket.activated'))
                  : parse(translate('components.ticket.actionRegistrationTicket.notYetActivated'))}
              </Styles.ActionRegistrationTicketStatus>
              {ticket?.activation_ticket && ticket?.activation_txId ? (
                <Styles.TicketContent>
                  ({parse(translate('components.ticket.actionRegistrationTicket.activationTXID'))}{' '}
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
              {parse(translate('components.ticket.nftCollectionRegistrationTicket.permittedUsers'))}
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
              {parse(translate('components.ticket.nftCollectionRegistrationTicket.key'))}
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
              {parse(translate('components.ticket.nftCollectionRegistrationTicket.label'))}
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
              {parse(translate('components.ticket.nftCollectionRegistrationTicket.creatorHeight'))}
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
      {ticket?.height ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.nftCollectionRegistrationTicket.height'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.height}`}
                value={ticket.height}
                title={ticket.height?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'components.ticket.nftCollectionRegistrationTicket.collectionItemCopyCount',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket?.collection_ticket?.collection_item_copy_count}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'components.ticket.nftCollectionRegistrationTicket.collectionFinalAllowedBlockHeight',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket?.collection_ticket?.collection_final_allowed_block_height}`}
              value={ticket?.collection_ticket?.collection_final_allowed_block_height}
              title={ticket?.collection_ticket?.collection_final_allowed_block_height?.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftCollectionRegistrationTicket.collectionName'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${
                ticket?.otherData?.collectionAlias || ticket?.collectionAlias
              }`}
              value={ticket?.collection_ticket?.collection_name}
              title={ticket?.collection_ticket?.collection_name}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'components.ticket.nftCollectionRegistrationTicket.collectionTicketVersion',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket?.collection_ticket?.collection_ticket_version}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftCollectionRegistrationTicket.itemType'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.collection_ticket?.item_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate('components.ticket.nftCollectionRegistrationTicket.maxCollectionEntries'),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket?.collection_ticket?.max_collection_entries}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'components.ticket.nftCollectionRegistrationTicket.listOfPastelidsOfAuthorizedContributors',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket?.collection_ticket?.list_of_pastelids_of_authorized_contributors?.join(', ')}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftCollectionRegistrationTicket.royalty'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.royalty || '0'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.nftCollectionRegistrationTicket.royaltyAddress'))}
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
            {parse(translate('components.ticket.nftCollectionRegistrationTicket.green'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket?.green?.toString() || 'false'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate('components.ticket.nftCollectionRegistrationTicket.storageFee', {
                currency: getCurrencyName(),
              }),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {formatNumber(ticket.storage_fee)} {getCurrencyName()} {storageFee}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signatures={ticket.signatures} />
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.nftCollectionRegistrationTicket.timestamp'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatFullDate(ticket.transactionTime, { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket?.collection_ticket?.app_ticket ? (
        <Styles.Accordion
          expanded={isExpanded}
          onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
        >
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.nftRegistrationTicket.appTicket'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded
                    ? parse(translate('components.ticket.nftRegistrationTicket.hideDetail'))
                    : parse(
                        translate('components.ticket.nftRegistrationTicket.clickToSeeDetail'),
                      )}{' '}
                  <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <AppTicket appTicket={ticket.collection_ticket.app_ticket} />
          </AccordionDetails>
        </Styles.Accordion>
      ) : null}
    </Box>
  );
};

export default NFTCollectionRegistrationTicket;
