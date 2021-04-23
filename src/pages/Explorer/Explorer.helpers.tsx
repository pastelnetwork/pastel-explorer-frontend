import { INetworkMasternodes, INetworkPeers } from '@utils/types/INetwork';
import themeVariant from '@theme/variants';

export const MARKER_SEPARATOR = '<br>';

export const transformGeoLocationConnections = (
  locations: Array<INetworkPeers | INetworkMasternodes>,
  isMasternode: boolean,
) => {
  const transformedLocations = locations.map(({ latitude, longitude, country, city, id, ip }) => {
    const latLng = [latitude, longitude] as [number, number];
    const name = `
      ${isMasternode ? 'Masternode' : 'Peer'}${MARKER_SEPARATOR}
      Country: ${country}${MARKER_SEPARATOR}
      City: ${city}${MARKER_SEPARATOR}
      PastelID: ${id}${MARKER_SEPARATOR}
      IP: ${ip}
    `;
    const { masternode, peer } = themeVariant.map;
    const fill = isMasternode ? masternode : peer;

    return {
      latLng,
      name,
      style: { fill },
    };
  });

  return transformedLocations;
};
