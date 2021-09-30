import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import { MarkerProps } from '@components/Map/Map';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork, INetworkSupernodes } from '@utils/types/INetwork';

import ExplorerMap from './ExplorerMap/ExplorerMap';
import LatestTransactions from './LatestTransactions/LatestTransactions';
import SupernodeStatistics from './SupernodeStatistics/SupernodeStatistics';
import { transformGeoLocationConnections, groupGeoLocationConnections } from './Explorer.helpers';
import LatestTransactionsRT from './LatestTransactionsRT';
import LatestBlocks from './LatestBlocks';
import * as Styles from './Explorer.styles';

const Explorer: React.FC = () => {
  const [supernodeList, setSupernodeList] = React.useState<Array<INetworkSupernodes> | null>(null);
  const [geoLocationList, setGeoLocationList] = React.useState<Array<MarkerProps> | null>(null);
  const [nodesLength, setNodesLength] = React.useState({ peers: 0, supernodes: 0 });
  const fetchGeoData = useFetch<INetwork>({
    method: 'get',
    url: `${URLS.NETWORK_URL}`,
  });

  const transformGeoLocationData = ({ peers, masternodes }: INetwork) => {
    const transformedPeers = transformGeoLocationConnections(peers, false);
    const transformedSupernodes = transformGeoLocationConnections(masternodes, true);
    const groupedNodes = groupGeoLocationConnections([
      ...transformedPeers,
      ...transformedSupernodes,
    ]);

    setNodesLength({ peers: peers.length, supernodes: masternodes.length });
    setGeoLocationList(groupedNodes);
  };

  React.useEffect(() => {
    fetchGeoData.fetchData().then(response => {
      if (response) {
        setSupernodeList(response.masternodes);
        transformGeoLocationData(response);
      }
    });
  }, []);

  return (
    <Styles.ExplorerWrapper>
      <Header title="Explorer" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={7}>
          <ExplorerMap geoLocationList={geoLocationList} nodesLength={nodesLength} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <SupernodeStatistics supernodes={supernodeList} />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <LatestBlocks />
        </Grid>
        <Grid item xs={12} lg={6}>
          <LatestTransactionsRT />
        </Grid>
      </Grid>
      <Grid item>
        <LatestTransactions />
      </Grid>
    </Styles.ExplorerWrapper>
  );
};

export default Explorer;
