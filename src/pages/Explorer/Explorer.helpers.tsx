import { MarkerProps } from '@components/Map/Map';

import { INetworkMasternodes, INetworkPeers } from '@utils/types/INetwork';
import themeVariant from '@theme/variants';

const { masternode, peer } = themeVariant.map;

export const transformGeoLocationConnections = (
  locations: Array<INetworkPeers | INetworkMasternodes>,
  isMasternode: boolean,
): Array<MarkerProps> => {
  const transformedLocations = locations.map(({ latitude, longitude, country, city, id, ip }) => {
    const latLng = [latitude, longitude] as [number, number];
    const defaultName = `${country} ${city !== 'N/A' ? `- ${city}` : ''}`;
    const fill = isMasternode ? masternode : peer;
    const data = {
      type: isMasternode ? 'Supernode' : 'Peer',
      country,
      city,
      id,
      ip,
    };

    return {
      latLng,
      name: defaultName,
      style: { fill },
      data: [data],
    };
  });

  return transformedLocations;
};

export const groupGeoLocationConnections = (locations: Array<MarkerProps>): Array<MarkerProps> => {
  const groupedLocations = locations.reduce((acc: Array<Array<MarkerProps>>, value) => {
    const hasSameLat = acc.length && acc[acc.length - 1][0].latLng[0] === value.latLng[0];
    const hasSameLng = acc.length && acc[acc.length - 1][0].latLng[1] === value.latLng[1];

    if (hasSameLat && hasSameLng) {
      acc[acc.length - 1].push(value);
    } else {
      acc.push([value]);
    }

    return acc;
  }, []);

  const displayLocations = groupedLocations.map(locationElements => {
    const firstElement = locationElements[0];
    const name = `${firstElement.name} (${locationElements.length})`;

    if (locationElements.length > 1) {
      return {
        latLng: firstElement.latLng,
        name,
        style: firstElement.style,
        data: locationElements.map(locationElement => locationElement.data[0]),
      };
    }

    return {
      ...firstElement,
      name,
    };
  });

  return displayLocations;
};
