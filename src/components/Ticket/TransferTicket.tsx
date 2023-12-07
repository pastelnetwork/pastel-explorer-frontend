import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';

import RouterLink, { ExternalLink } from '@components/RouterLink/RouterLink';
import { ITransferTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { formatFullDate } from '@utils/helpers/date/date';
import { translate } from '@utils/helpers/i18n';
import CopyButton from '@components/CopyButton/CopyButton';

import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface ITransferTicketProps {
  ticket: ITransferTicket;
  variant?: string;
}

const TransferTicket: React.FC<ITransferTicketProps> = ({ ticket, variant }) => {
  if (variant === 'transaction') {
    const getImage = () => {
      let image = noImagePlaceholder;
      if (ticket.image) {
        image =
          ticket.otherData.offerType === 'nft-offer'
            ? ticket.image
            : `data:image/jpeg;base64,${ticket.image}`;
      }
      return (
        <img
          src={image}
          alt={ticket.otherData.txId}
          className={`nft-image ${!ticket.image ? 'placeholder' : ''}`}
        />
      );
    };
    const renderDetailLink = () => {
      if (ticket.otherData.offerType === 'sense') {
        return (
          <ExternalLink
            href={`${ROUTES.SENSE_DETAILS}?txid=${ticket.otherData.ticketId}`}
            value={getImage()}
          />
        );
      }
      if (ticket.otherData.offerType === 'cascade') {
        return (
          <ExternalLink
            href={`${ROUTES.CASCADE_DETAILS}?txid=${ticket.otherData.ticketId}`}
            value={getImage()}
          />
        );
      }

      return (
        <ExternalLink
          href={`${ROUTES.NFT_DETAILS}?txid=${ticket.otherData.ticketId}#offers`}
          value={getImage()}
        />
      );
    };

    const getOfferType = () => {
      switch (ticket.otherData.offerType) {
        case 'sense':
        case 'sense-offer':
          return parse(translate('components.ticket.offerTicket.sense'));
        case 'cascade':
          return parse(translate('components.ticket.offerTicket.cascade'));
        default:
          return parse(translate('components.ticket.offerTicket.nft'));
      }
    };

    const itemUrl = () => {
      switch (ticket.otherData.offerType) {
        case 'sense':
        case 'sense-offer':
          return `/sense?txid=${ticket.otherData.regTxId}`;
        case 'cascade':
          return `/cascade?txid=${ticket.otherData.regTxId}`;
        default:
          return `/nft?txid=${ticket.otherData.regTxId}`;
      }
    };

    return (
      <Styles.OfferWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} className="max-w-355">
            {renderDetailLink()}
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.pastelID'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent>
                  <RouterLink
                    route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.pastelID}`}
                    value={ticket.pastelID}
                    title={ticket.pastelID}
                    className="address-link"
                  />
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.copySerialNr'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent>{ticket.copy_serial_nr}</Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.registrationTxId'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent className="nowrap">
                  <CopyButton copyText={ticket.registration_txid} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.registration_txid}`}
                    value={ticket.registration_txid}
                    title={ticket.registration_txid}
                    className="address-link"
                  />
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.activationTxID'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent className="nowrap">
                  <CopyButton copyText={ticket.item_txid || ticket.nft_txid} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.item_txid || ticket.nft_txid}`}
                    value={ticket.item_txid || ticket.nft_txid}
                    title={ticket.item_txid || ticket.nft_txid}
                    className="address-link"
                  />
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.offerTxid'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent className="nowrap">
                  <CopyButton copyText={ticket.offer_txid} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.offer_txid}`}
                    value={ticket.offer_txid}
                    title={ticket.offer_txid}
                    className="address-link"
                  />{' '}
                  (
                  <RouterLink
                    route={itemUrl()}
                    value={parse(translate('components.ticket.transferTicket.ticketDetail'))}
                    className="address-link"
                  />
                  )
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.acceptTxId'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent className="nowrap">
                  <CopyButton copyText={ticket.accept_txid} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.accept_txid}`}
                    value={ticket.accept_txid}
                    title={ticket.accept_txid}
                    className="address-link"
                  />
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <div className="driver" />
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.offerTicket.type'))}:
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent>{getOfferType()}</Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-sm-8">
              <Grid item xs={12} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.transferTicket.version'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
              </Grid>
            </Grid>
            <Signatures signature={ticket.signature} variant={variant} />
            {ticket.transactionTime ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.transferTicket.timestamp'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Styles.TicketContent>
                    {formatFullDate(ticket.transactionTime, { dayName: false })}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Styles.OfferWrapper>
    );
  }
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.version'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.pastelID'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.pastelID}`}
              value={ticket.pastelID}
              title={ticket.pastelID}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signature={ticket.signature} />
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.offerTxid'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent className="nowrap">
            <CopyButton copyText={ticket.offer_txid} />
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.offer_txid}`}
              value={ticket.offer_txid}
              title={ticket.offer_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.acceptTxId'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent className="nowrap">
            <CopyButton copyText={ticket.accept_txid} />
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.accept_txid}`}
              value={ticket.accept_txid}
              title={ticket.accept_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.itemTxId'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent className="nowrap">
            <CopyButton copyText={ticket.item_txid || ticket.nft_txid} />
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.item_txid || ticket.nft_txid}`}
              value={ticket.item_txid || ticket.nft_txid}
              title={ticket.item_txid || ticket.nft_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.registrationTxId'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent className="nowrap">
            <CopyButton copyText={ticket.registration_txid} />
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.registration_txid}`}
              value={ticket.registration_txid}
              title={ticket.registration_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.transferTicket.copySerialNr'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.copy_serial_nr}</Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.transferTicket.timestamp'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatFullDate(ticket.transactionTime, { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default TransferTicket;
