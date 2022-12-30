import * as React from 'react';

import { Grid } from '@material-ui/core';

import { MarkerProps } from '@components/Map/Map';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork, INetworkSupernodes } from '@utils/types/INetwork';
import * as ROUTES from '@utils/constants/routes';

import ExplorerMap from './ExplorerMap/ExplorerMap';
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
    const groupedNodes = groupGeoLocationConnections(
      [...transformedPeers, ...transformedSupernodes],
      true,
    );

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
      <Styles.Gird>
        <Styles.ExplorerMapColumn>
          <ExplorerMap geoLocationList={geoLocationList} nodesLength={nodesLength} />
        </Styles.ExplorerMapColumn>
        <Styles.SupernodeColumn>
          <SupernodeStatistics supernodes={supernodeList} link={ROUTES.SUPERNODES} />
        </Styles.SupernodeColumn>
      </Styles.Gird>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} md={6} className="left">
          <LatestBlocks />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} md={6} className="right">
          <LatestTransactionsRT />
        </Styles.GirdStyle>
      </Grid>
    </Styles.ExplorerWrapper>
  );
};

export default Explorer;
