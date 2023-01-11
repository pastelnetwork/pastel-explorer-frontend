import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { INetwork } from '@utils/types/INetwork';

import {
  transformGeoLocationConnections,
  groupGeoLocationConnections,
} from '@pages/Explorer/Explorer.helpers';

const transformGeoLocationData = ({ peers, masternodes }: INetwork) => {
  const transformedPeers = transformGeoLocationConnections(peers, false);
  const transformedSupernodes = transformGeoLocationConnections(masternodes, true);
  const groupedNodes = groupGeoLocationConnections(
    [...transformedPeers, ...transformedSupernodes],
    true,
  );
  return {
    nodesLength: { peers: peers.length, supernodes: masternodes.length },
    groupedNodes,
  };
};

export default function useNetwork() {
  const { data, isLoading } = useSWR<INetwork>(URLS.NETWORK_URL, axiosGet);
  if (data) {
    const { nodesLength, groupedNodes } = transformGeoLocationData(data);

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
