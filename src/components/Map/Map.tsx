import React from 'react';
import { VectorMap } from 'react-jvectormap';

import { CardHeader } from '@material-ui/core';

import * as Styles from './Map.styles';
import { defaultMapOptions } from './Map.options';
import './map.css';

interface MarkerProps {
  latLng: Array<number>;
  name: string;
}

interface MapProps {
  title: string;
  markers: Array<MarkerProps>;
}

const Map: React.FC<MapProps> = ({ title, markers }) => {
  return (
    <Styles.Card mb={4}>
      <CardHeader title={title} />
      <Styles.CardContent>
        <Styles.MapContainer>
          <VectorMap markers={markers} {...defaultMapOptions} />
        </Styles.MapContainer>
      </Styles.CardContent>
    </Styles.Card>
  );
};

export default Map;