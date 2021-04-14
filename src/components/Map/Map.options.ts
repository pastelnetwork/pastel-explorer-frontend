const regionColor = '#e3eaef';
const markerColor = '#243045';
const markerStrokeColor = '#fff';

export const defaultMapOptions = {
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
  zoomOnScroll: false,
};
