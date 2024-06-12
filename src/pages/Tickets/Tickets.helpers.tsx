import { useEffect } from 'react';
import { withStyles } from '@mui/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { decode } from 'js-base64';

import CopyButton from '@components/CopyButton/CopyButton';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName } from '@utils/appInfo';
import { formatAddress, formatBytes } from '@utils/helpers/format';
import { formatFullDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { TicketsList, TTicketType } from '@utils/types/ITransactions';
import { TAppTheme } from '@theme/index';
import breakpoints from '@theme/breakpoints';
import * as TicketsStyles from '@components/Ticket/Ticket.styles';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import { getFileIcon } from '@pages/Details/CascadeDetails/CascadeDetails.helpers';
import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';

import {
  TXID_KEY,
  TIMESTAMP_KEY,
  PASTEL_ID_KEY,
  USERNAME_KEY,
  ID_TYPE_KEY,
} from './Tickets.columns';

const getTicketTitle = (type: TTicketType) => {
  switch (type) {
    case 'pastelid':
      return parse(translate('pages.tickets.ticketsTitle.pastelid'));
    case 'username-change':
      return parse(translate('pages.tickets.ticketsTitle.usernameChange'));
    case 'nft-reg':
      return parse(translate('pages.tickets.ticketsTitle.nftReg'));
    case 'nft-act':
      return parse(translate('pages.tickets.ticketsTitle.nftAct'));
    case 'collection-reg':
      return parse(translate('pages.tickets.ticketsTitle.nftCollectionReg'));
    case 'collection-act':
      return parse(translate('pages.tickets.ticketsTitle.nftCollectionAct'));
    case 'nft-royalty':
      return parse(translate('pages.tickets.ticketsTitle.nftRoyalty'));
    case 'action-reg':
      return parse(translate('pages.tickets.ticketsTitle.actionReg'));
    case 'action-act':
      return parse(translate('pages.tickets.ticketsTitle.actionAct'));
    case 'offer':
      return parse(translate('pages.tickets.ticketsTitle.offer'));
    case 'accept':
      return parse(translate('pages.tickets.ticketsTitle.accept'));
    case 'transfer':
      return parse(translate('pages.tickets.ticketsTitle.transfer'));
    default:
      return '';
  }
};

export const DATA_LIMIT = 15;

export const StyledTableCell = withStyles((theme: TAppTheme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme: TAppTheme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const getStorageFee = (pslPrice: number, usdPrice: number) => {
  if (pslPrice && usdPrice) {
    return ` (${formatNumber(pslPrice * usdPrice, { decimalsLength: 2 })} ${translateDropdown(
      'common.usd',
    )})`;
  }
  return ` (0 ${translateDropdown('common.usd')})`;
};

export const transformCascadeData = (cascade: TicketsList[], usdPrice: number) =>
  cascade.map(
    ({
      transactionHash,
      activation_ticket,
      fee,
      timestamp,
      activation_txId,
      fileType,
      fileName,
      fileSize,
    }) => {
      return {
        id: transactionHash,
        [TXID_KEY]: (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2}>
              <Box className="title">{parse(translate('pages.tickets.txID'))}</Box>
              <Box className="bold">
                <Grid container alignItems="center" wrap="nowrap">
                  <CopyButton copyText={transactionHash} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                    value={formatAddress(transactionHash, 5, -5)}
                    title={transactionHash}
                    className="address-link"
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.status'))}</Box>
              <Box className="bold">
                <Tooltip
                  arrow
                  title={
                    activation_ticket
                      ? translateDropdown('pages.tickets.activated')
                      : translateDropdown('pages.tickets.notYetActivated')
                  }
                >
                  <Box className="ticket-status">
                    <TicketsStyles.ActionRegistrationTicketStatus
                      className={`space-nowrap action-ticket-status ${
                        activation_ticket ? 'active' : ''
                      }`}
                    >
                      {activation_ticket
                        ? parse(translate('pages.tickets.activated'))
                        : parse(translate('pages.tickets.notYetActivated'))}
                    </TicketsStyles.ActionRegistrationTicketStatus>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.fileName'))}</Box>
              <Box className="bold read-more">
                <Tooltip title={fileName}>
                  <span>{fileName}</span>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{parse(translate('pages.tickets.cascadeOutput'))}</Box>
              <Box className="bold">
                {activation_ticket ? (
                  <>
                    <span className="nowrap">
                      {parse(translate('pages.tickets.fileSize'))}: {formatBytes(fileSize || 0)}
                    </span>
                    {' - '}
                    <RouterLink
                      route={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}
                      value={parse(translate('pages.tickets.senseDetail'))}
                      title={transactionHash}
                      className="address-link"
                    />
                  </>
                ) : (
                  parse(translate('pages.tickets.pendingActivation'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="ticket-output image-mobile xs">
              {activation_txId ? (
                <Box className="cascade-image">
                  <Link to={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}>
                    {getFileIcon(fileType || '')}
                  </Link>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box className="title">{parse(translate('pages.tickets.activationTXID'))}</Box>
              <Box className={activation_txId ? 'bold' : ''}>
                {activation_txId ? (
                  <Grid container alignItems="center" wrap="nowrap">
                    <CopyButton copyText={activation_txId} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
                      value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
                      title={activation_txId}
                      className="address-link"
                    />
                  </Grid>
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="ticket-output image-mobile sm">
              {activation_txId ? (
                <Box className="cascade-image">
                  <Link to={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}>
                    {getFileIcon(fileType || '')}
                  </Link>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.fee'))}</Box>
              <Box className="bold">
                {formatNumber(fee)} {getCurrencyName()} {getStorageFee(fee, usdPrice)}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.timestamp'))}</Box>
              <Box className="bold">
                {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="ticket-output image-desktop">
              {activation_txId ? (
                <Box className="cascade-image">
                  <Link to={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}>
                    {getFileIcon(fileType || '')}
                  </Link>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        ),
      };
    },
  );

export const transformSenseData = (sense: TicketsList[], usdPrice: number) =>
  sense.map(
    ({
      transactionHash,
      activation_ticket,
      timestamp,
      imageHash,
      activation_txId,
      collectionName,
      collectionAlias,
      dupeDetectionSystemVersion,
      fee,
      imageFileCdnUrl,
    }) => {
      return {
        id: transactionHash,
        [TXID_KEY]: (
          <Grid container spacing={3} className="sense-col">
            <Grid item xs={12} sm={6} md={3} className="col-txid">
              <Box className="title">{parse(translate('pages.tickets.txID'))}</Box>
              <Box className="bold">
                <CopyButton copyText={transactionHash} />
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                  value={formatAddress(transactionHash, 5, -5)}
                  title={transactionHash}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="col-status">
              <Box className="title">{parse(translate('pages.tickets.status'))}</Box>
              <Box className="bold">
                <Tooltip
                  arrow
                  title={
                    activation_ticket
                      ? translateDropdown('pages.tickets.activated')
                      : translateDropdown('pages.tickets.notYetActivated')
                  }
                >
                  <Box className="ticket-status">
                    <TicketsStyles.ActionRegistrationTicketStatus
                      className={`space-nowrap action-ticket-status ${
                        activation_ticket ? 'active' : ''
                      }`}
                    >
                      {activation_ticket
                        ? parse(translate('pages.tickets.activated'))
                        : parse(translate('pages.tickets.notYetActivated'))}
                    </TicketsStyles.ActionRegistrationTicketStatus>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="col-time">
              <Box className="title">{parse(translate('pages.tickets.collectionName'))}</Box>
              <Box className={collectionName ? 'bold' : ''}>
                {collectionName ? (
                  <RouterLink
                    route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionAlias}`}
                    value={collectionName}
                    title={collectionName}
                    className="address-link read-more"
                  />
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="sense-output">
              <Box className="title">{parse(translate('pages.tickets.senseOutput'))}</Box>
              <Box className="bold">
                {activation_ticket ? (
                  <div>
                    {!dupeDetectionSystemVersion && !imageFileCdnUrl ? (
                      <>{parse(translate('pages.tickets.pendingSenseGenerate'))}</>
                    ) : (
                      <>
                        <span className="nowrap">
                          {parse(translate('pages.tickets.version'))}: {dupeDetectionSystemVersion}
                        </span>{' '}
                        -{' '}
                        <RouterLink
                          route={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${imageHash}`}
                          value={parse(translate('pages.tickets.senseDetail'))}
                          title={imageHash}
                          className="address-link nowrap"
                        />
                      </>
                    )}
                  </div>
                ) : (
                  parse(translate('pages.tickets.pendingActivation'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2} className="ticket-output image-mobile xs">
              {activation_ticket ? (
                <div>
                  {dupeDetectionSystemVersion && imageFileCdnUrl ? (
                    <Link to={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${imageHash}`}>
                      <img
                        src={
                          imageFileCdnUrl
                            ? `data:image/jpeg;base64,${imageFileCdnUrl}`
                            : noImagePlaceholder
                        }
                        alt={imageHash}
                        className="sense-img"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="col-txid">
              <Box className="title">{parse(translate('pages.tickets.activationTXID'))}</Box>
              <Box className={activation_txId ? 'bold' : ''}>
                {activation_txId ? (
                  <>
                    <CopyButton copyText={activation_txId} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
                      value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
                      title={activation_txId}
                      className="address-link"
                    />
                  </>
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2} className="ticket-output image-mobile sm">
              {activation_ticket ? (
                <div>
                  {dupeDetectionSystemVersion && imageFileCdnUrl ? (
                    <Link to={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${imageHash}`}>
                      <img
                        src={
                          imageFileCdnUrl
                            ? `data:image/jpeg;base64,${imageFileCdnUrl}`
                            : noImagePlaceholder
                        }
                        alt={imageHash}
                        className="sense-img"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="col-status">
              <Box className="title">{parse(translate('pages.tickets.fee'))}</Box>
              <Box className="bold">
                {formatNumber(fee)} {getCurrencyName()} {getStorageFee(fee, usdPrice)}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="col-time">
              <Box className="title">{parse(translate('pages.tickets.timestamp'))}</Box>
              <Box className="bold">
                {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2} className="ticket-output image-desktop">
              {activation_ticket ? (
                <div>
                  {dupeDetectionSystemVersion && imageFileCdnUrl ? (
                    <Link to={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${imageHash}`}>
                      <img
                        src={
                          imageFileCdnUrl
                            ? `data:image/jpeg;base64,${imageFileCdnUrl}`
                            : noImagePlaceholder
                        }
                        alt={imageHash}
                        className="sense-img"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Grid>
          </Grid>
        ),
      };
    },
  );

export const transformOtherData = (data: TicketsList[], usdPrice: number) =>
  data.map(
    ({
      transactionHash,
      activation_ticket,
      timestamp,
      activation_txId,
      fee,
      collectionName,
      collectionAlias,
      item_type,
      nft_copy_count,
      nft_max_count,
    }) => {
      return {
        id: transactionHash,
        [TXID_KEY]: (
          <Grid container spacing={3} className="collection-col">
            <Grid item xs={12} sm={6} md={2}>
              <Box className="title">{parse(translate('pages.tickets.txID'))}</Box>
              <Box className="bold">
                <CopyButton copyText={transactionHash} />
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                  value={formatAddress(transactionHash, 5, -5)}
                  title={transactionHash}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.status'))}</Box>
              <Box className="bold">
                <Tooltip
                  arrow
                  title={
                    activation_ticket
                      ? translateDropdown('pages.tickets.activated')
                      : translateDropdown('pages.tickets.notYetActivated')
                  }
                >
                  <Box className="ticket-status">
                    <TicketsStyles.ActionRegistrationTicketStatus
                      className={`space-nowrap action-ticket-status ${
                        activation_ticket ? 'active' : ''
                      }`}
                    >
                      {activation_ticket
                        ? parse(translate('pages.tickets.activated'))
                        : parse(translate('pages.tickets.notYetActivated'))}
                    </TicketsStyles.ActionRegistrationTicketStatus>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="col-time">
              <Box className="title">{parse(translate('pages.tickets.collectionName'))}</Box>
              <Box className={collectionName ? 'bold' : ''}>
                {collectionName ? (
                  <RouterLink
                    route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionAlias}`}
                    value={collectionName}
                    title={collectionName}
                    className="address-link read-more"
                  />
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="col-type">
              <Box className="title">{parse(translate('pages.tickets.collectionType'))}</Box>
              <Box className={item_type ? 'bold' : ''}>
                {item_type ? item_type.toUpperCase() : parse(translate('common.na'))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box className="title">{parse(translate('pages.tickets.activationTXID'))}</Box>
              <Box className={activation_txId ? 'bold' : ''}>
                {activation_txId ? (
                  <>
                    <CopyButton copyText={activation_txId} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
                      value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
                      title={activation_txId}
                      className="address-link"
                    />
                  </>
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.fee'))}</Box>
              <Box className="bold">
                {formatNumber(fee)} {getCurrencyName()} {getStorageFee(fee, usdPrice)}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="col-time">
              <Box className="title">{parse(translate('pages.tickets.timestamp'))}</Box>
              <Box className="bold">
                {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="col-type">
              <Box className="title">{parse(translate('pages.tickets.numberOfEntries'))}</Box>
              <Box className={nft_max_count ? 'bold' : ''}>
                {nft_max_count
                  ? `${formatNumber(nft_copy_count || 0)}/${formatNumber(nft_max_count)}`
                  : parse(translate('common.na'))}
              </Box>
            </Grid>
          </Grid>
        ),
      };
    },
  );

export const transformPastelIdData = (data: TicketsList[]) =>
  data.map(({ transactionHash, pastelID, timestamp, userName, reTxId, id_type }) => {
    return {
      id: transactionHash,
      [TXID_KEY]: (
        <Grid container alignItems="center" wrap="nowrap">
          <CopyButton copyText={transactionHash} />
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
            value={formatAddress(transactionHash, 5, -5)}
            title={transactionHash}
            className="address-link"
          />
        </Grid>
      ),
      [PASTEL_ID_KEY]: (
        <RouterLink
          route={`${ROUTES.PASTEL_ID_DETAILS}/${pastelID}`}
          value={formatAddress(pastelID, 5, -5)}
          title={pastelID}
          className="address-link"
        />
      ),
      [USERNAME_KEY]: (
        <div>
          {userName ? (
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${reTxId}`}
              value={userName}
              title={userName}
              className="address-link read-more"
            />
          ) : (
            parse(translate('common.na'))
          )}
        </div>
      ),
      [ID_TYPE_KEY]: <span className="text-capitalize">{id_type || '--'}</span>,
      [TIMESTAMP_KEY]: timestamp ? formatFullDate(timestamp, { dayName: false }) : '--',
    };
  });

export const transformOfferAndTransferData = (data: TicketsList[]) =>
  data.map(
    ({
      transactionHash,
      type,
      timestamp,
      pastelID,
      copyNumber,
      image,
      version,
      reTxId,
      ticketType,
    }) => {
      const getInfo = () => {
        if (ticketType === 'sense') {
          return {
            link: `${ROUTES.SENSE_DETAILS}?txid=${reTxId}`,
            label: parse(translate('pages.tickets.senseOutput')),
          };
        }

        if (ticketType === 'cascade') {
          return {
            link: `${ROUTES.CASCADE_DETAILS}?txid=${reTxId}`,
            label: parse(translate('pages.tickets.cascadeOutput')),
          };
        }

        return {
          link: `${ROUTES.NFT_DETAILS}?txid=${reTxId}`,
          label: parse(translate('pages.tickets.pastelNFT')),
        };
      };

      const getImage = () => {
        return (
          <Link to={getInfo().link}>
            <img
              src={image ? `data:image/jpeg;base64,${image}` : noImagePlaceholder}
              alt={reTxId}
              className="sense-img"
            />
          </Link>
        );
      };

      return {
        id: transactionHash,
        [TXID_KEY]: (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.txID'))}</Box>
              <Box className="bold">
                <Grid container alignItems="center" wrap="nowrap">
                  <CopyButton copyText={transactionHash} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                    value={formatAddress(transactionHash, 5, -5)}
                    title={transactionHash}
                    className="address-link"
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box className="title">{parse(translate('pages.tickets.type'))}</Box>
              <Box className="bold">{getTicketTitle(type as TTicketType)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{parse(translate('pages.tickets.copyNumber'))}</Box>
              <Box className="bold">{copyNumber ? formatNumber(copyNumber) : 0}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{getInfo().label}</Box>
              <Box className="bold">
                <RouterLink
                  route={getInfo().link}
                  value={parse(translate('pages.tickets.senseDetail'))}
                  title={reTxId}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ticket-output image-mobile xs">
              {getImage()}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.pastelID'))}</Box>
              <Box className="bold">
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${pastelID}`}
                  value={formatAddress(pastelID, 5, -5)}
                  title={pastelID}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ticket-output image-mobile sm">
              {getImage()}
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box className="title">{parse(translate('pages.tickets.version'))}</Box>
              <Box className="bold">{version}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="title">{parse(translate('pages.tickets.timestamp'))}</Box>
              <Box className="bold">
                {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ticket-output image-desktop">
              {getImage()}
            </Grid>
          </Grid>
        ),
      };
    },
  );

export const transformPastelNftTicketsData = (data: TicketsList[], usdPrice: number) =>
  data.map(
    ({
      transactionHash,
      timestamp,
      activation_ticket,
      activation_txId,
      collectionName,
      collectionAlias,
      image,
      fee,
      nftId,
    }) => {
      return {
        id: transactionHash,
        [TXID_KEY]: (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.txID'))}</Box>
              <Box className="bold">
                <Grid container alignItems="center" wrap="nowrap">
                  <CopyButton copyText={transactionHash} />
                  <RouterLink
                    route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                    value={formatAddress(transactionHash, 5, -5)}
                    title={transactionHash}
                    className="address-link"
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.status'))}</Box>
              <Box className="bold">
                <Tooltip
                  arrow
                  title={
                    activation_ticket
                      ? translateDropdown('pages.tickets.activated')
                      : translateDropdown('pages.tickets.notYetActivated')
                  }
                >
                  <Box className="ticket-status">
                    <TicketsStyles.ActionRegistrationTicketStatus
                      className={`space-nowrap action-ticket-status ${
                        activation_ticket ? 'active' : ''
                      }`}
                    >
                      {activation_ticket
                        ? parse(translate('pages.tickets.activated'))
                        : parse(translate('pages.tickets.notYetActivated'))}
                    </TicketsStyles.ActionRegistrationTicketStatus>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.collectionName'))}</Box>
              <Box className={collectionName ? 'bold' : ''}>
                {collectionName ? (
                  <RouterLink
                    route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionAlias}`}
                    value={collectionName}
                    title={collectionName}
                    className="address-link read-more"
                  />
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.pastelNFT'))}</Box>
              <Box className="bold">
                {activation_ticket ? (
                  <div>
                    {nftId ? (
                      <RouterLink
                        route={`${ROUTES.NFT_DETAILS}?txid=${transactionHash}`}
                        value={parse(translate('pages.tickets.senseDetail'))}
                        title={transactionHash}
                        className="address-link"
                      />
                    ) : (
                      parse(translate('pages.tickets.pendingPastelNftGenerate'))
                    )}
                  </div>
                ) : (
                  parse(translate('pages.tickets.pendingActivation'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ticket-output image-mobile xs">
              {activation_ticket ? (
                <div>
                  {nftId ? (
                    <Link to={`${ROUTES.NFT_DETAILS}?txid=${transactionHash}`}>
                      <img
                        src={image ? `data:image/jpeg;base64,${image}` : noImagePlaceholder}
                        alt={transactionHash || ''}
                        className="sense-img"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.activationTXID'))}</Box>
              <Box className={activation_txId ? 'bold' : ''}>
                {activation_txId ? (
                  <Grid container alignItems="center" wrap="nowrap">
                    <CopyButton copyText={activation_txId} />
                    <RouterLink
                      route={`${ROUTES.TRANSACTION_DETAILS}/${activation_txId}`}
                      value={activation_txId ? formatAddress(activation_txId, 5, -5) : ''}
                      title={activation_txId}
                      className="address-link"
                    />
                  </Grid>
                ) : (
                  parse(translate('common.na'))
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ticket-output image-mobile sm">
              {activation_ticket ? (
                <div>
                  {nftId ? (
                    <Link to={`${ROUTES.NFT_DETAILS}?txid=${transactionHash}`}>
                      <img
                        src={image ? `data:image/jpeg;base64,${image}` : noImagePlaceholder}
                        alt={transactionHash || ''}
                        className="sense-img"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.fee'))}</Box>
              <Box className="bold">
                {formatNumber(fee)} {getCurrencyName()} {getStorageFee(fee, usdPrice)}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{parse(translate('pages.tickets.timestamp'))}</Box>
              <Box className={timestamp ? 'bold' : ''}>
                {timestamp
                  ? formatFullDate(timestamp, { dayName: false })
                  : parse(translate('common.na'))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ticket-output image-desktop">
              {activation_ticket ? (
                <div>
                  {nftId ? (
                    <Link to={`${ROUTES.NFT_DETAILS}?txid=${transactionHash}`}>
                      <img
                        src={image ? `data:image/jpeg;base64,${image}` : noImagePlaceholder}
                        alt={transactionHash || ''}
                        className="sense-img"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Grid>
          </Grid>
        ),
      };
    },
  );

export const transformInferenceAPICreditPackData = (data: TicketsList[]) =>
  data.map(({ transactionHash, timestamp, image, reTxId, ticketType, contract_ticket }) => {
    const getInfo = () => {
      if (ticketType === 'sense') {
        return {
          link: `${ROUTES.SENSE_DETAILS}?txid=${reTxId}`,
          label: parse(translate('pages.tickets.senseOutput')),
        };
      }

      if (ticketType === 'cascade') {
        return {
          link: `${ROUTES.CASCADE_DETAILS}?txid=${reTxId}`,
          label: parse(translate('pages.tickets.cascadeOutput')),
        };
      }

      return {
        link: `${ROUTES.NFT_DETAILS}?txid=${reTxId}`,
        label: parse(translate('pages.tickets.pastelNFT')),
      };
    };

    const getImage = () => {
      return (
        <Link to={getInfo().link}>
          <img
            src={image ? `data:image/jpeg;base64,${image}` : noImagePlaceholder}
            alt={reTxId}
            className="sense-img"
          />
        </Link>
      );
    };

    const parseContractTicket = contract_ticket ? JSON.parse(decode(contract_ticket)) : null;

    return {
      id: transactionHash,
      [TXID_KEY]: (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="title">{parse(translate('pages.tickets.txID'))}</Box>
            <Box className="bold">
              <Grid container alignItems="center" wrap="nowrap">
                <CopyButton copyText={transactionHash} />
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                  value={formatAddress(transactionHash, 5, -5)}
                  title={transactionHash}
                  className="address-link"
                />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Box className="title">{parse(translate('pages.tickets.type'))}</Box>
            <Box className="bold">{parse(translate('pages.tickets.inferenceTicketType'))}</Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="title">{parse(translate('pages.tickets.initialCredits'))}</Box>
            <Box className="bold">
              {parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
                ?.requested_initial_credits_in_credit_pack
                ? formatNumber(
                    parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
                      ?.requested_initial_credits_in_credit_pack,
                  )
                : parse(translate('common.na'))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="title">{parse(translate('pages.tickets.costPerCredit'))}</Box>
            <Box className="bold">
              {parseContractTicket?.ticket_input_data_dict
                ?.credit_pack_purchase_request_response_dict?.psl_cost_per_credit
                ? formatNumber(
                    parseContractTicket.ticket_input_data_dict
                      .credit_pack_purchase_request_response_dict.psl_cost_per_credit,
                  )
                : 0}{' '}
              {getCurrencyName()}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="ticket-output image-mobile xs">
            {getImage()}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="title">{parse(translate('pages.tickets.pastelID'))}</Box>
            <Box className="bold">
              {parseContractTicket.ticket_input_data_dict
                .credit_pack_purchase_request_confirmation_dict.requesting_end_user_pastelid ? (
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_confirmation_dict.requesting_end_user_pastelid}`}
                  value={formatAddress(
                    parseContractTicket.ticket_input_data_dict
                      .credit_pack_purchase_request_confirmation_dict.requesting_end_user_pastelid,
                    5,
                    -5,
                  )}
                  title={
                    parseContractTicket.ticket_input_data_dict
                      .credit_pack_purchase_request_confirmation_dict.requesting_end_user_pastelid
                  }
                  className="address-link"
                />
              ) : (
                parse(translate('common.na'))
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Box className="title">{parse(translate('pages.tickets.version'))}</Box>
            <Box className="bold">
              {parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
                ?.credit_purchase_request_message_version_string || parse(translate('common.na'))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="title">{parse(translate('pages.tickets.timestamp'))}</Box>
            <Box className="bold">
              {timestamp ? formatFullDate(timestamp, { dayName: false }) : '--'}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="title">
              {parse(translate('pages.tickets.ticketUncompressedSizeInBytes'))}
            </Box>
            <Box className="bold">
              {parseContractTicket?.ticket_uncompressed_size_in_bytes
                ? formatNumber(parseContractTicket?.ticket_uncompressed_size_in_bytes)
                : parse(translate('common.na'))}
            </Box>
          </Grid>
        </Grid>
      ),
    };
  });

export const ticketsSummary = [
  {
    id: 'senseTickets',
    name: parse(translate('pages.tickets.senseTickets')),
    link: `${ROUTES.TICKETS_TYPE}/sense`,
  },
  {
    id: 'cascadeTickets',
    name: parse(translate('pages.tickets.cascadeTickets')),
    link: `${ROUTES.TICKETS_TYPE}/cascade`,
  },
  {
    id: 'pastelIDAndUsernameTickets',
    name: parse(translate('pages.tickets.pastelIDAndUsernameTickets')),
    link: `${ROUTES.TICKETS_TYPE}/pastelid-usename`,
  },
  {
    id: 'pastelNFTTickets',
    name: parse(translate('pages.tickets.pastelNFTTickets')),
    link: `${ROUTES.TICKETS_TYPE}/pastel-nft`,
  },
  {
    id: 'offerTicketsAndTransferTickets',
    name: parse(translate('pages.tickets.offerTicketsAndTransferTickets')),
    link: `${ROUTES.TICKETS_TYPE}/offer-transfer`,
  },
  {
    id: 'miscOtherTicketTypes',
    name: parse(translate('pages.tickets.senseAndNFTCollectionTickets')),
    link: `${ROUTES.TICKETS_TYPE}/other`,
  },
  {
    id: 'inferenceAPICreditPackTypes',
    name: parse(translate('pages.tickets.inferenceAPICreditPackTickets')),
    link: `${ROUTES.TICKETS_TYPE}/inference-api`,
  },
];

type TFields = {
  [key: string]: number;
};

type TLoadingFields = {
  [key: string]: boolean | undefined;
};

export type TTicketResponse = {
  data: TicketsList[];
  total: number;
  isLoading: boolean;
  size: number;
  setSize: (_size: number | ((_size: number) => number)) => void;
};

export const getTotalTickets = (field: string, fields: TFields) => {
  const total = fields[field];
  return total > 0
    ? parse(translate('pages.tickets.ticketsTitle.totalTickets', { total: formatNumber(total) }))
    : parse(translate('pages.tickets.ticketsTitle.totalTicket', { total: formatNumber(total) }));
};

export const isLoading = (field: string, fields: TLoadingFields) => {
  return fields[field];
};

export const useShowLess = (setShowLess: (_val: boolean) => void) => {
  const handleResize = () => {
    if (window.innerWidth >= breakpoints.values.sm) {
      setShowLess(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
