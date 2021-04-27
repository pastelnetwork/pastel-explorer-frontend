import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { INetworkMasternodes } from '@utils/types/INetwork';

import {
  SUPERNODE_IP_KEY,
  SUPERNODE_PORT_KEY,
  SUPERNODE_ADDRESS_KEY,
  SUPERNODE_STATUS_KEY,
  SUPERNODE_COUNTRY_KEY,
  SUPERNODE_LAST_PAID_KEY,
} from './Supernodes.columns';

export const DATA_FETCH_LIMIT = 50;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const transformSupernodesData = (masternodes: Array<INetworkMasternodes>) =>
  masternodes.map(({ ip, port, address, status, country, lastPaidTime }) => ({
    [SUPERNODE_IP_KEY]: ip,
    [SUPERNODE_PORT_KEY]: port,
    [SUPERNODE_ADDRESS_KEY]: (
      <RouterLink route={`${ROUTES.ADDRESS_DETAILS}/${address}`} value={address} />
    ),
    [SUPERNODE_STATUS_KEY]: status,
    [SUPERNODE_COUNTRY_KEY]: country,
    [SUPERNODE_LAST_PAID_KEY]: lastPaidTime,
  }));
