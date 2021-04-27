import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';

import Map, { MarkerProps } from '@components/Map/Map';
import { setInfoDrawer } from '@redux/actions/infoDrawerActions';
import themeVariant from '@theme/variants';

import { generateDrawerContent } from './ExplorerMap.helpers';
import * as Styles from './ExplorerMap.styles';
import { generateMapOptions } from './ExplorerMap.options';

interface ExplorerMapProps {
  geoLocationList: Array<MarkerProps> | null;
}

const ExplorerMap: React.FC<ExplorerMapProps> = ({ geoLocationList }) => {
  const dispatch = useDispatch();
  const mapOptions = generateMapOptions(geoLocationList);

  const mapMarkerClickOption = {
    onMarkerClick: (event: Event, code: number) => {
      const selectedLocation = geoLocationList && geoLocationList[code];

      if (selectedLocation) {
        const content = generateDrawerContent(selectedLocation);
        dispatch(setInfoDrawer(true, content));
      }
    },
  };

  return (
    <Styles.Container>
      <Map
        markers={geoLocationList}
        title="Explorer Map"
        options={{ ...mapOptions, ...mapMarkerClickOption }}
      />
      <Styles.LegendContainer>
        <Grid container alignItems="center">
          <Styles.LegendElement backgroundcolor={themeVariant.map.masternode} />
          <Typography variant="caption">Supernodes</Typography>
        </Grid>
        <Grid container alignItems="center">
          <Styles.LegendElement backgroundcolor={themeVariant.map.peer} />
          <Typography variant="caption">Peers</Typography>
        </Grid>
      </Styles.LegendContainer>
    </Styles.Container>
  );
};

export default ExplorerMap;
