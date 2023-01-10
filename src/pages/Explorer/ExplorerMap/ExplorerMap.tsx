import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Map from '@components/Map/Map';
import { setInfoDrawer } from '@redux/actions/infoDrawerActions';
import useNetwork from '@hooks/useNetwork';
import themeVariant from '@theme/variants';

import { generateDrawerContent } from './ExplorerMap.helpers';
import * as Styles from './ExplorerMap.styles';
import { generateMapOptions } from './ExplorerMap.options';

import * as ExplorerStyles from '../Explorer.styles';

interface ExplorerMapProps {
  hidePeer?: boolean;
}

const ExplorerMap: React.FC<ExplorerMapProps> = ({ hidePeer = false }) => {
  const { geoLocationList, nodesLength, isLoading } = useNetwork();
  const dispatch = useDispatch();
  const mapOptions = generateMapOptions(geoLocationList);

  const mapMarkerClickOption = {
    onMarkerClick: (event: Event, code: number) => {
      const selectedLocation = geoLocationList && geoLocationList[code];

      if (selectedLocation) {
        const content = generateDrawerContent(selectedLocation);
        dispatch(setInfoDrawer(true, content, 'Map details'));
      }
    },
  };

  if (isLoading) {
    return (
      <ExplorerStyles.BlockWrapper>
        <ExplorerStyles.BlockTitle>Explorer Map</ExplorerStyles.BlockTitle>
        <Skeleton animation="wave" variant="rect" height={355} />
      </ExplorerStyles.BlockWrapper>
    );
  }

  return (
    <Styles.Container>
      <Map
        markers={geoLocationList}
        title="Explorer Map"
        options={{ ...mapOptions, ...mapMarkerClickOption }}
      />
      <Styles.LegendContainer>
        <Grid container alignItems="center">
          <Styles.LegendElement backgroundcolor={themeVariant.map.supernode} />
          <Typography variant="caption">Supernodes ({nodesLength.supernodes})</Typography>
        </Grid>
        {!hidePeer ? (
          <Grid container alignItems="center">
            <Styles.LegendElement backgroundcolor={themeVariant.map.peer} />
            <Typography variant="caption">Peers ({nodesLength.peers})</Typography>
          </Grid>
        ) : null}
      </Styles.LegendContainer>
    </Styles.Container>
  );
};

export default ExplorerMap;
