import { VectorMap } from 'react-jvectormap';
import themeVariant from '@theme/variants';

const regionColor = themeVariant.map.background;
const markerColor = themeVariant.palette.primary.main;
const markerStrokeColor = themeVariant.palette.primary.contrastText;

export const defaultMapOptions: typeof VectorMap = {
  map: 'world_mill',
  regionStyle: {
    initial: {
      fill: regionColor,
    },
  },
  backgroundColor: 'transparent',
  containerStyle: {
    width: '100%',
    height: '100%',
  },
  markerStyle: {
    initial: {
      r: 9,
      fill: markerColor,
      'fill-opacity': 1,
      stroke: markerStrokeColor,
      'stroke-width': 7,
      'stroke-opacity': 0.4,
    },
    hover: {
      stroke: markerStrokeColor,
      'fill-opacity': 1,
      'stroke-width': 1.5,
    },
  },
  zoomOnScroll: true,
  zoomMax: 2048,
};
