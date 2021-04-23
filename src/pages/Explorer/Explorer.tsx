import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Map, { MarkerProps } from '@components/Map/Map';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork, INetworkMasternodes } from '@utils/types/INetwork';

import LatestTransactions from './LatestTransactions/LatestTransactions';
import SupernodeStatistics from './SupernodeStatistics/SupernodeStatistics';
import { transformGeoLocationConnections, MARKER_SEPARATOR } from './Explorer.helpers';

const Explorer: React.FC = () => {
  const [masternodeList, setMasternodeList] = React.useState<Array<INetworkMasternodes> | null>(
    null,
  );
  const [geoLocationList, setGeoLocationList] = React.useState<Array<MarkerProps> | null>(null);
  const fetchGeoData = useFetch<INetwork>({
    method: 'get',
    url: `${URLS.NETWORK_URL}`,
  });

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

  const mapOptions = {
    onMarkerTipShow: (event: Event, element: Array<HTMLElement>) => {
      const labelElement = element[0];
      const replaced = labelElement.innerText.split(MARKER_SEPARATOR);
      labelElement.innerHTML = replaced.join(MARKER_SEPARATOR);
    },
  };

  return (
    <>
      <Header title="Explorer" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Map markers={geoLocationList} title="Explorer Map" options={mapOptions} />
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
