import { Grid, Box } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import { translate } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';
import { formattedTimeElapsed, formatFullDate } from '@utils/helpers/date/date';
import { INetworkSupernodes } from '@utils/types/INetwork';
import { formatAddress } from '@utils/helpers/format';

import { SUPERNODE_IP_KEY } from './Supernodes.columns';
import * as Styles from './Supernodes.styles';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';
export const STATUS_LIST = [
  {
    value: 'all',
    name: 'pages.supernodes.all',
  },
  {
    value: 'PRE_ENABLED',
    name: 'pages.supernodes.preEnabled',
  },
  {
    value: 'ENABLED',
    name: 'pages.supernodes.enabled',
  },
  {
    value: 'EXPIRED',
    name: 'pages.supernodes.expired',
  },
  {
    value: 'WATCHDOG_EXPIRED',
    name: 'pages.supernodes.watchdogExpired',
  },
  {
    value: 'NEW_START_REQUIRED',
    name: 'pages.supernodes.newStartRequired',
  },
  {
    value: 'UPDATE_REQUIRED',
    name: 'pages.supernodes.updateRequired',
  },
  {
    value: 'POSE_BAN',
    name: 'pages.supernodes.poseBan',
  },
  {
    value: 'OUTPOINT_SPENT',
    name: 'pages.supernodes.outpointSpent',
  },
];

const generateStatusData = (status: string) => {
  return <Styles.Status className={status.toLowerCase()}>{status}</Styles.Status>;
};

export const transformSupernodesData = (masternodes: Array<INetworkSupernodes>) =>
  masternodes.map(
    ({
      ip,
      port,
      address,
      status,
      country,
      lastPaidTime,
      lastPaidBlock,
      snPastelIdPubkey,
      rankAsOfBlockHeight,
      protocolVersion,
      masternodeRank,
      dateTimeLastSeen,
      activeSeconds,
    }) => ({
      [SUPERNODE_IP_KEY]: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.rank')}</Box>
              <Box className="bold">
                {masternodeRank < 0 ? translate('common.na') : masternodeRank}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.supernodeIP')}</Box>
              <Box className="bold">
                {ip}:{port}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.address')}</Box>
              <Box className="bold">
                <CopyButton copyText={address} />
                <RouterLink
                  route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
                  value={formatAddress(address, 5, -5)}
                  textSize="large"
                  title={address}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.status')}</Box>
              <Box>{generateStatusData(status)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.lastPaid')}</Box>
              <Box className="bold">{formattedTimeElapsed(lastPaidTime)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.lastPaidBlock')}</Box>
              <Box className="bold">
                <RouterLink
                  route={`${ROUTES.BLOCK_DETAILS}/${lastPaidBlock}`}
                  value={lastPaidBlock}
                  textSize="large"
                  title={lastPaidBlock.toString()}
                  className="address-link"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.dateTimeLastSeen')}</Box>
              <Box className="bold">{formatFullDate(dateTimeLastSeen * 1000)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.activeSeconds')}</Box>
              <Box className="bold">{activeSeconds}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.rankAsOfBlockHeight')}</Box>
              <Box className="bold">
                {rankAsOfBlockHeight < 0 ? (
                  translate('common.na')
                ) : (
                  <RouterLink
                    route={`${ROUTES.BLOCK_DETAILS}/${rankAsOfBlockHeight}`}
                    value={rankAsOfBlockHeight}
                    textSize="large"
                    title={rankAsOfBlockHeight.toString()}
                    className="address-link"
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.protocolVersion')}</Box>
              <Box className="bold">{protocolVersion}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.country')}</Box>
              <Box className="bold">{country}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">{translate('pages.supernodes.snPastelIdPubkey')}</Box>
              <Box className="bold">
                <CopyButton copyText={snPastelIdPubkey} />
                <RouterLink
                  route={`${ROUTES.PASTEL_ID_DETAILS}/${snPastelIdPubkey}`}
                  value={formatAddress(snPastelIdPubkey, 5, -5)}
                  textSize="large"
                  title={snPastelIdPubkey}
                  className="address-link"
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    }),
  );

export const getCsvHeaders = () => {
  return [
    { key: 'masternodeRank', label: translate('pages.supernodes.rank') },
    { key: 'supernodeIP', label: translate('pages.supernodes.supernodeIP') },
    { key: 'address', label: translate('pages.supernodes.address') },
    { key: 'status', label: translate('pages.supernodes.status') },
    { key: 'lastPaid', label: translate('pages.supernodes.lastPaid') },
    { key: 'lastPaidBlock', label: translate('pages.supernodes.lastPaidBlock') },
    { key: 'dateTimeLastSeen', label: translate('pages.supernodes.dateTimeLastSeen') },
    { key: 'activeSeconds', label: translate('pages.supernodes.activeSeconds') },
    { key: 'rankAsOfBlockHeight', label: translate('pages.supernodes.rankAsOfBlockHeight') },
    { key: 'protocolVersion', label: translate('pages.supernodes.protocolVersion') },
    { key: 'country', label: translate('pages.supernodes.country') },
    { key: 'snPastelIdPubkey', label: translate('pages.supernodes.snPastelIdPubkey') },
  ];
};

export const getCsvData = (supernodes: INetworkSupernodes[]) => {
  if (!supernodes.length) {
    return [];
  }
  return supernodes.map(item => ({
    masternodeRank: item.masternodeRank < 0 ? translate('common.na') : item.masternodeRank,
    supernodeIP: `${item.ip}:${item.port}`,
    address: item.address,
    status: item.status,
    lastPaid: formattedTimeElapsed(item.lastPaidTime),
    lastPaidBlock: item.lastPaidBlock,
    dateTimeLastSeen: formatFullDate(item.dateTimeLastSeen * 1000),
    activeSeconds: item.activeSeconds,
    rankAsOfBlockHeight:
      item.rankAsOfBlockHeight < 0 ? translate('common.na') : item.rankAsOfBlockHeight,
    protocolVersion: item.protocolVersion,
    country: item.country,
    snPastelIdPubkey: item.snPastelIdPubkey,
  }));
};
