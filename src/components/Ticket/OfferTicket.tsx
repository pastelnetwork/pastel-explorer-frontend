import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouterLink, { ExternalLink } from '@components/RouterLink/RouterLink';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IOfferTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import { formatFullDate } from '@utils/helpers/date/date';
import { translate } from '@utils/helpers/i18n';

import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';

import { useStorageFee } from './Ticket.helpers';
import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IOfferTicketProps {
  ticket: IOfferTicket;
  variant?: string;
}

const OfferTicket: React.FC<IOfferTicketProps> = ({ ticket, variant }) => {
  const { storageFee } = useStorageFee(ticket.asked_price);
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
  if (variant === 'transaction') {
    return (
      <Styles.OfferWrapper>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            {ticket.otherData.offerType === 'nft-offer' ? (
              <ExternalLink
                href={`${ROUTES.NFT_DETAILS}?txid=${ticket.otherData.regTxId}#offers`}
                value={getImage()}
              />
            ) : (
              <ExternalLink
                href={`${ROUTES.SENSE_DETAILS}?txid=${ticket.otherData.regTxId}`}
                value={getImage()}
              />
            )}
          </Grid>
          <Grid item xs={8} sm={9}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.pastelID')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>
                  {ticket.pastelID && ticket.pastelID !== 'not defined' ? (
                    <RouterLink
                      route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.pastelID}`}
                      value={ticket.pastelID}
                      title={ticket.pastelID}
                      className="address-link"
                    />
                  ) : (
                    translate('common.na')
                  )}
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.copyNumber')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>{ticket.copy_number}</Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.askedPrice')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>
                  {formatNumber(ticket.asked_price)} {getCurrencyName()} {storageFee}
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <div className="driver" />
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.version')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.itemTxId')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${ticket?.item_txid || ticket?.nft_txid}`}
                    value={ticket?.item_txid || ticket?.nft_txid}
                    title={ticket?.item_txid || ticket?.nft_txid}
                    className="address-link"
                  />
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.validAfter')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>
                  {ticket.valid_after ? (
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${ticket.valid_after}`}
                      value={ticket.valid_after}
                      title={ticket.valid_after?.toString()}
                      className="address-link"
                    />
                  ) : (
                    ticket.valid_after
                  )}
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.validBefore')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>
                  {ticket.valid_before ? (
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${ticket.valid_before}`}
                      value={ticket.valid_before}
                      title={ticket.valid_before?.toString()}
                      className="address-link"
                    />
                  ) : (
                    ticket.valid_before
                  )}
                </Styles.TicketContent>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {translate('components.ticket.offerTicket.lockedRecipient')}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>{ticket.locked_recipient}</Styles.TicketContent>
              </Grid>
            </Grid>
            <Signatures signature={ticket.signature} />
            {ticket.transactionTime ? (
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {translate('components.ticket.offerTicket.timestamp')}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
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
            {translate('components.ticket.offerTicket.version')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.pastelID')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket.pastelID && ticket.pastelID !== 'not defined' ? (
              <RouterLink
                route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.pastelID}`}
                value={ticket.pastelID}
                title={ticket.pastelID}
                className="address-link"
              />
            ) : (
              translate('common.na')
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.copyNumber')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.copy_number}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.askedPrice')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {formatNumber(ticket.asked_price)} {getCurrencyName()} {storageFee}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.itemTxId')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${ticket?.item_txid || ticket?.nft_txid}`}
              value={ticket?.item_txid || ticket?.nft_txid}
              title={ticket?.item_txid || ticket?.nft_txid}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.validAfter')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket.valid_after ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.valid_after}`}
                value={ticket.valid_after}
                title={ticket.valid_after?.toString()}
                className="address-link"
              />
            ) : (
              ticket.valid_after
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.validBefore')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {ticket.valid_before ? (
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.valid_before}`}
                value={ticket.valid_before}
                title={ticket.valid_before?.toString()}
                className="address-link"
              />
            ) : (
              ticket.valid_before
            )}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {translate('components.ticket.offerTicket.lockedRecipient')}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.locked_recipient}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signature={ticket.signature} />
      {ticket.transactionTime ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {translate('components.ticket.offerTicket.timestamp')}
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

export default OfferTicket;
