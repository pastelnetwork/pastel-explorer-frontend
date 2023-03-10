import { Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';

import * as ROUTES from '@utils/constants/routes';
import { formattedTimeElapsed } from '@utils/helpers/date/date';
import { INetworkSupernodes } from '@utils/types/INetwork';

import {
  SUPERNODE_IP_KEY,
  SUPERNODE_PORT_KEY,
  SUPERNODE_ADDRESS_KEY,
  SUPERNODE_STATUS_KEY,
  SUPERNODE_COUNTRY_KEY,
  SUPERNODE_LAST_PAID_KEY,
} from './Supernodes.columns';
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
  masternodes.map(({ ip, port, address, status, country, lastPaidTime }) => ({
    [SUPERNODE_IP_KEY]: ip,
    [SUPERNODE_PORT_KEY]: port,
    [SUPERNODE_ADDRESS_KEY]: (
      <Grid container alignItems="center" wrap="nowrap">
        <CopyButton copyText={address} />
        <RouterLink
          route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
          value={address}
          textSize="large"
          title={address}
          className="address-link"
        />
      </Grid>
    ),
    [SUPERNODE_STATUS_KEY]: generateStatusData(status),
    [SUPERNODE_COUNTRY_KEY]: country,
    [SUPERNODE_LAST_PAID_KEY]: formattedTimeElapsed(lastPaidTime),
  }));
