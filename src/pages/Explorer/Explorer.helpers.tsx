import { MarkerProps } from '@components/Map/Map';

import { INetworkSupernodes, INetworkPeers } from '@utils/types/INetwork';
import themeVariant from '@theme/variants';
import { translate } from '@utils/helpers/i18n';

const { supernode, peer } = themeVariant.map;

export const NODE_NAMES = {
  supernode: 'Supernode',
  peer: 'Peer',
};

export const transformGeoLocationConnections = (
  locations: Array<INetworkPeers | INetworkSupernodes>,
  isSupernode: boolean,
): Array<MarkerProps> => {
  const transformedLocations = locations.map(
    ({ latitude = 0, longitude = 0, country = '', city = '', id = '', ip = '' }) => {
      const latLng = [latitude, longitude] as [number, number];
      const defaultName = `${country} ${city !== 'N/A' ? `- ${city}` : ''}`;
      const fill = isSupernode ? supernode : peer;
      const data = {
        type: isSupernode ? NODE_NAMES.supernode : NODE_NAMES.peer,
        country,
        city,
        id,
        ip,
      };

      return {
        latLng,
        name: defaultName,
        style: { fill, stroke: fill },
        data: [data],
      };
    },
  );

  return transformedLocations;
};

export const groupGeoLocationConnections = (
  locations: Array<MarkerProps>,
  hasPeerData = false,
): Array<MarkerProps> => {
  const groupedLocations = locations.reduce((acc: Array<Array<MarkerProps>>, value) => {
    const sameLocationIndex = acc.findIndex(element => {
      const hasSameLat = element[0]?.latLng[0] === value?.latLng[0];
      const hasSameLng = element[0]?.latLng[1] === value?.latLng[1];

      return hasSameLat && hasSameLng;
    });

    if (sameLocationIndex > -1) {
      acc[sameLocationIndex].push(value);
    } else {
      acc.push([value]);
    }

    return acc;
  }, []);

  const displayLocations = groupedLocations.map(locationElements => {
    const firstElement = locationElements[0];
    const peerList = locationElements.filter(l => l.data.filter(d => d.type === 'Peer').length);
    const supernodeList = locationElements.filter(
      l => l.data.filter(d => d.type === 'Supernode').length,
    );
    const counter: string[] = [];
    if (hasPeerData) {
      if (peerList.length) {
        counter.push(`${translate('pages.explorer.peer')}: ${peerList.length}`);
      }
      if (supernodeList.length) {
        counter.push(`${translate('pages.explorer.supernode')}: ${supernodeList.length}`);
      }
    } else {
      counter.push(`${locationElements.length}`);
    }
    const name = `${firstElement.name} (${counter.join(', ')})`;
    if (locationElements.length > 1) {
      const hasPeer = locationElements.find(element => element.data[0].type === NODE_NAMES.peer);
      const hasSupernode = locationElements.find(
        element => element.data[0].type === NODE_NAMES.supernode,
      );
      const hasBothNodes = hasPeer && hasSupernode;

      return {
        latLng: firstElement.latLng,
        name,
        style: hasBothNodes
          ? {
              fill: themeVariant.map.supernode,
              stroke: themeVariant.map.peer,
            }
          : firstElement.style,
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
