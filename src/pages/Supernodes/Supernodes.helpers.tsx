import Chip from '@material-ui/core/Chip';

import RouterLink from '@components/RouterLink/RouterLink';

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

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

const statusColor = (status: string) => (
  <Chip
    label={status}
    color={status.toLowerCase() !== 'enabled' ? 'default' : 'primary'}
    size="small"
  />
);

export const transformSupernodesData = (masternodes: Array<INetworkSupernodes>) =>
  masternodes.map(({ ip, port, address, status, country, lastPaidTime }) => ({
    [SUPERNODE_IP_KEY]: ip,
    [SUPERNODE_PORT_KEY]: port,
    [SUPERNODE_ADDRESS_KEY]: (
      <RouterLink route={`${ROUTES.ADDRESS_DETAILS}/${address}`} value={address} />
    ),
    [SUPERNODE_STATUS_KEY]: statusColor(status),
    [SUPERNODE_COUNTRY_KEY]: country,
    [SUPERNODE_LAST_PAID_KEY]: formattedTimeElapsed(lastPaidTime),
  }));
