import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import parse from 'html-react-parser';

import Map from '@components/Map/Map';
import { setInfoDrawer } from '@redux/actions/infoDrawerActions';
import useNetwork from '@hooks/useNetwork';
import themeVariant from '@theme/variants';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import { generateDrawerContent } from './ExplorerMap.helpers';
import * as Styles from './ExplorerMap.styles';
import { generateMapOptions } from './ExplorerMap.options';

import * as ExplorerStyles from '../Explorer.styles';

interface ExplorerMapProps {
  hidePeer?: boolean;
}

const ExplorerMap: React.FC<ExplorerMapProps> = ({ hidePeer = false }) => {
  const { geoLocationList, nodesLength, isLoading } = useNetwork(hidePeer);
  const dispatch = useDispatch();
  const mapOptions = generateMapOptions(geoLocationList);

  const mapMarkerClickOption = {
    onMarkerClick: (event: Event, code: number) => {
      const selectedLocation = geoLocationList && geoLocationList[code];

      if (selectedLocation) {
        const content = generateDrawerContent(selectedLocation);
        dispatch(setInfoDrawer(true, content, translateDropdown('pages.explorer.mapDetails')));
      }
    },
  };

  if (isLoading) {
    return (
      <ExplorerStyles.BlockWrapper>
        <ExplorerStyles.BlockTitle>
          {parse(translate('pages.explorer.explorerMap'))}
        </ExplorerStyles.BlockTitle>
        <Skeleton animation="wave" variant="rect" height={355} />
      </ExplorerStyles.BlockWrapper>
    );
  }

  return (
    <Styles.Container>
      <Map
        markers={geoLocationList}
        title={parse(translate('pages.explorer.explorerMap'))}
        options={{ ...mapOptions, ...mapMarkerClickOption }}
      />
      <Styles.LegendContainer>
        <Grid container alignItems="center">
          <Styles.LegendElement backgroundcolor={themeVariant.map.supernode} />
          <Typography variant="caption">
            {parse(translate('pages.explorer.supernodes'))} ({nodesLength.supernodes})
          </Typography>
        </Grid>
        {!hidePeer ? (
          <Grid container alignItems="center">
            <Styles.LegendElement backgroundcolor={themeVariant.map.peer} />
            <Typography variant="caption">
              {parse(translate('pages.explorer.peers'))} ({nodesLength.peers})
            </Typography>
          </Grid>
        ) : null}
      </Styles.LegendContainer>
    </Styles.Container>
  );
};

export default ExplorerMap;
