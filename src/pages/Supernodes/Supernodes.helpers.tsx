import { translate } from '@utils/helpers/i18n';
import { formattedTimeElapsed, formatFullDate } from '@utils/helpers/date/date';
import { INetworkSupernodes } from '@utils/types/INetwork';

import * as Styles from './Supernodes.styles';

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'desc';
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

export const generateStatusData = (status: string) => {
  return <Styles.Status className={status.toLowerCase()}>{status}</Styles.Status>;
};

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
