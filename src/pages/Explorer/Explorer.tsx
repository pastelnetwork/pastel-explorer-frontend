import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Map, { MarkerProps } from '@components/Map/Map';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork, INetworkPeers, INetworkMasternodes } from '@utils/types/INetwork';

import themeVariant from '@theme/variants';

import LatestTransactions from './LatestTransactions/LatestTransactions';
import SupernodeStatistics from './SupernodeStatistics/SupernodeStatistics';

const Explorer: React.FC = () => {
  const [masternodeList, setMasternodeList] = React.useState<Array<INetworkMasternodes> | null>(
    null,
  );
  const [geoLocationList, setGeoLocationList] = React.useState<Array<MarkerProps> | null>(null);
  const fetchGeoData = useFetch<INetwork>({
    method: 'get',
    url: `${URLS.NETWORK_URL}`,
  });
  const transformGeoLocationConnections = (
    locations: Array<INetworkPeers | INetworkMasternodes>,
    isMasternode: boolean,
  ) => {
    const transformedLocations = locations.map(({ latitude, longitude, country, city }) => {
      const latLng = [latitude, longitude] as [number, number];
      const name = city !== 'N/A' ? `${country} (${city})` : country;
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

  const transformGeoLocationData = ({ peers, masternodes }: INetwork) => {
    const transformedPeers = transformGeoLocationConnections(peers, false);
    const transformedMasternodes = transformGeoLocationConnections(masternodes, true);

    setGeoLocationList([...transformedPeers, ...transformedMasternodes]);
  };

  React.useEffect(() => {
    fetchGeoData.fetchData().then(response => {
      if (response) {
        setMasternodeList(response.masternodes);
        transformGeoLocationData(response);
      }
    });
  }, []);

  return (
    <>
      <Header title="Explorer" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Map markers={geoLocationList} title="Explorer Map" />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SupernodeStatistics masternodes={masternodeList} />
        </Grid>
      </Grid>
      <Grid item>
        <LatestTransactions />
      </Grid>
    </>
  );
};

export default Explorer;
