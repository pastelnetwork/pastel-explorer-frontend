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
import CopyButton from '@components/CopyButton/CopyButton';
import { getCurrencyName } from '@utils/appInfo';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';
import { translate } from '@utils/helpers/i18n';

import { useStorageFee } from './Ticket.helpers';
import ApiTicket from './ApiTicket';
import Signatures from './Signatures';
import { getTicketTitle } from './index';
import * as Styles from './Ticket.styles';

interface IActionRegistrationTicketProps {
  ticket: IActionRegistrationTicket;
  senseInfo?: ReactNode;
  showActivationTicket?: boolean;
  transactionHash?: string;
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
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.actionTicketVersion')}:
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.action_ticket_version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.actionType')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{nft.action_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.caller')}:
          </Styles.TicketTitle>
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
      {nft.blocknum ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.actionRegistrationTicket.blockNumber')}:
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
      {nft.block_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.actionRegistrationTicket.blockHash')}:
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
      {nft.api_ticket ? (
        <Styles.Accordion
          expanded={isExpanded}
          onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
        >
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.actionRegistrationTicket.apiTicket')}:
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded
                    ? translate('components.ticket.actionRegistrationTicket.hideDetail')
                    : translate('components.ticket.actionRegistrationTicket.clickToSeeDetail')}{' '}
                  <ExpandMoreIcon />
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
  transactionHash,
}) => {
  const { storageFee: activationTicketStorageFee } = useStorageFee(
    (ticket.activationTicket?.data?.ticket as IActionActivationTicket)?.storage_fee,
  );
  const { storageFee } = useStorageFee(ticket.storage_fee);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderActivationTicket = () => {
    if (!showActivationTicket || !ticket.activationTicket) {
      return null;
    }

    const activationTicket = ticket.activationTicket?.data?.ticket as IActionActivationTicket;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.actionActivationTicketDetail')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                {translate('components.ticket.actionRegistrationTicket.txId')}
              </Styles.TicketTitle>
              <Styles.TicketContent>
                <Grid container alignItems="center" wrap="nowrap">
                  <CopyButton copyText={ticket.activationTicket.transactionHash} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.activationTicket.transactionHash}`}
                    value={ticket.activationTicket.transactionHash}
                    title={ticket.activationTicket.transactionHash}
                    className="address-link small"
                  />
                </Grid>
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                {translate('components.ticket.actionRegistrationTicket.type')}
              </Styles.TicketTitle>
              <Styles.TicketContent>
                {getTicketTitle(ticket.activationTicket.type as TTicketType)}
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          {ticket.called_at ? (
            <Grid container spacing={3}>
              <Styles.ActivationTicketItem className="item">
                <Styles.TicketTitle className="mr-5">
                  {translate('components.ticket.actionRegistrationTicket.calledAt')}
                </Styles.TicketTitle>
                <Styles.TicketContent>
                  <RouterLink
                    route={`${ROUTES.BLOCK_DETAILS}/${activationTicket.called_at}`}
                    value={activationTicket.called_at}
                    title={activationTicket.called_at?.toString()}
                    className="address-link small"
                  />
                </Styles.TicketContent>
              </Styles.ActivationTicketItem>
            </Grid>
          ) : null}
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                {translate('components.ticket.actionRegistrationTicket.version')}
              </Styles.TicketTitle>
              <Styles.TicketContent>{activationTicket.version}</Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                {translate('components.ticket.actionRegistrationTicket.pastelID')}
              </Styles.TicketTitle>
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
          {activationTicket.reg_txid ? (
            <Grid container spacing={3}>
              <Styles.ActivationTicketItem className="item">
                <Styles.TicketTitle className="mr-5">
                  {translate('components.ticket.actionRegistrationTicket.regTxId')}
                </Styles.TicketTitle>
                <Styles.TicketContent>
                  <Grid container alignItems="center" wrap="nowrap">
                    <CopyButton copyText={activationTicket.reg_txid} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${activationTicket.reg_txid}`}
                      value={activationTicket.reg_txid}
                      title={activationTicket.reg_txid}
                      className="address-link small"
                    />
                  </Grid>
                </Styles.TicketContent>
              </Styles.ActivationTicketItem>
            </Grid>
          ) : null}
          <Grid container spacing={3}>
            <Styles.ActivationTicketItem className="item">
              <Styles.TicketTitle className="mr-5">
                {translate('components.ticket.actionRegistrationTicket.storageFee', {
                  currency: getCurrencyName(),
                })}
              </Styles.TicketTitle>
              <Styles.TicketContent>
                {formatNumber(activationTicket.storage_fee)} {getCurrencyName()}{' '}
                {activationTicketStorageFee}
              </Styles.TicketContent>
            </Styles.ActivationTicketItem>
          </Grid>
          {activationTicket.transactionTime ? (
            <Grid container spacing={3}>
              <Styles.ActivationTicketItem className="item">
                <Styles.TicketTitle className="mr-5">
                  {translate('components.ticket.actionRegistrationTicket.timestamp')}
                </Styles.TicketTitle>
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
      {ticket.action_type === 'sense' ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.actionRegistrationTicket.collectionName')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {ticket?.collectionName ? (
                <RouterLink
                  route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${ticket?.collectionAlias}`}
                  value={ticket?.collectionName}
                  title={ticket?.collectionName}
                  className="address-link small"
                />
              ) : (
                translate('common.na')
              )}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.actionType')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket.action_type}
            {ticket.action_type === 'cascade' && transactionHash && ticket.activation_txId ? (
              <>
                {' '}
                (
                <RouterLink
                  route={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}
                  value={translate('components.ticket.actionRegistrationTicket.viewDetails')}
                  title={ticket.activation_txId}
                  className="address-link"
                />
                )
              </>
            ) : null}
          </Styles.TicketContent>
        </Grid>
      </Grid>
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
                <CopyButton copyText={ticket?.activation_txId} />
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
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.version')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket?.key ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.actionRegistrationTicket.key')}
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
              {translate('components.ticket.actionRegistrationTicket.txIdOfPreburn')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.label}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket.called_at ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.actionRegistrationTicket.calledAt')}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.called_at}`}
                value={ticket.called_at}
                title={ticket.called_at?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.actionRegistrationTicket.storageFee', {
              currency: getCurrencyName(),
            })}
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
              {translate('components.ticket.actionRegistrationTicket.timestamp')}
            </Styles.TicketTitle>
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
                <Styles.TicketTitle>
                  {translate('components.ticket.actionRegistrationTicket.actionTicket')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded
                    ? translate('components.ticket.actionRegistrationTicket.hideDetail')
                    : translate('components.ticket.actionRegistrationTicket.clickToSeeDetail')}{' '}
                  <ExpandMoreIcon />
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
