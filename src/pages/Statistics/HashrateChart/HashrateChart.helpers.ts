const timestampMsDifference = {
  h1: 3600,
  h3: 10800,
  h6: 21600,
  h12: 43200,
};

export const zoomOptions = [
  { name: '1h', tooltip: '1 hour', timestampDifference: timestampMsDifference.h1 },
  { name: '3h', tooltip: '3 hours', timestampDifference: timestampMsDifference.h3 },
  { name: '6h', tooltip: '6 hours', timestampDifference: timestampMsDifference.h6 },
  { name: '12h', tooltip: '12 hours', timestampDifference: timestampMsDifference.h12 },
];
