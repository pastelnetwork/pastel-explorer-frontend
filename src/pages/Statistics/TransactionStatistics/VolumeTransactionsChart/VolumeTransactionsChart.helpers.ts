const timestampMsDifference = {
  m1: 2592000,
  m3: 7776000,
  m6: 15552000,
  y1: 31104000,
};

export const zoomOptions = [
  { name: '1m', tooltip: '1 month', timestampDifference: timestampMsDifference.m1 },
  { name: '3m', tooltip: '3 months', timestampDifference: timestampMsDifference.m3 },
  { name: '6m', tooltip: '6 months', timestampDifference: timestampMsDifference.m6 },
  { name: '1y', tooltip: '1 year', timestampDifference: timestampMsDifference.y1 },
];