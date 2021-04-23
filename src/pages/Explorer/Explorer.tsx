import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table from '@components/Table/Table';
import Map, { MarkerProps } from '@components/Map/Map';
import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INetwork, INetworkPeers, INetworkMasternodes } from '@utils/types/INetwork';

import themeVariant from '@theme/variants';

import { mockChartTableData } from './Explorer.helpers';
import LatestTransactions from './LatestTransactions/LatestTransactions';

const Explorer: React.FC = () => {
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
      if (!response) return null;
      return transformGeoLocationData(response);
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
          <DoughnutChart
            title="Supernode Statistics"
            innerTitle="Total"
            innerSubtitle={formatNumber(3729, { decimalsLength: 0 })}
            data={mockChartTableData.data}
            table={<Table headers={mockChartTableData.headers} rows={mockChartTableData.rows} />}
          />
        </Grid>
      </Grid>
      <Grid item>
        <LatestTransactions />
      </Grid>
    </>
  );
};

export default Explorer;
