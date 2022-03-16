import React from 'react';
import { VectorMap } from 'react-jvectormap';

import * as Styles from './Map.styles';
import { defaultMapOptions } from './Map.options';
import './map.css';

interface MarkerStyle {
  fill: string;
  stroke: string;
}

export interface MarkerData {
  type: string;
  country: string;
  city: string;
  id: string;
  ip: string;
}

export interface MarkerProps {
  latLng: [number, number];
  name: string;
  style: MarkerStyle;
  data: Array<MarkerData>;
}

export interface MapProps {
  title: string;
  markers: Array<MarkerProps> | null;
  options?: typeof VectorMap;
}

const Map: React.FC<MapProps> = ({ title, markers, options }) => {
  return (
    <Styles.Card>
      <h4>{title}</h4>
      <Styles.CardContent>
        <Styles.MapContainer>
          {markers && <VectorMap markers={markers} {...defaultMapOptions} {...options} />}
        </Styles.MapContainer>
      </Styles.CardContent>
    </Styles.Card>
  );
};

export default Map;
