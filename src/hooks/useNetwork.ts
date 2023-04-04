import useSWR from 'swr';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { INetwork } from '@utils/types/INetwork';

import {
  transformGeoLocationConnections,
  groupGeoLocationConnections,
} from '@pages/Explorer/Explorer.helpers';

const transformGeoLocationData = ({ peers, masternodes }: INetwork, hidePeer?: boolean) => {
  const transformedPeers = hidePeer ? [] : transformGeoLocationConnections(peers, false);
  const transformedSupernodes = transformGeoLocationConnections(masternodes, true);
  const groupedNodes = groupGeoLocationConnections(
    [...transformedPeers, ...transformedSupernodes],
    true,
  );
  return {
    nodesLength: { peers: hidePeer ? [] : peers.length, supernodes: masternodes.length },
    groupedNodes,
  };
};

export default function useNetwork(hidePeer?: boolean) {
  const { data, isLoading } = useSWR<INetwork>(URLS.NETWORK_URL, axiosGet, SWR_OPTIONS);
  if (data) {
    const { nodesLength, groupedNodes } = transformGeoLocationData(data, hidePeer);

    return {
      supernodeList: data?.masternodes,
      geoLocationList: groupedNodes,
      nodesLength,
      isLoading,
    };
  }

  return {
    supernodeList: [],
    geoLocationList: [],
    nodesLength: { peers: 0, supernodes: 0 },
    isLoading,
  };
}
