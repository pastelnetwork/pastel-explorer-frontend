import themeVariant from '@theme/variants';

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

export const generateVolumeOfTransactionsData = () => ({
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  datasets: [
    {
      label: '1',
      data: [10, 20, 30, 40, 50, 40, 30, 40, 30],
      fill: true,
      borderColor: themeVariant.map.peer,
      backgroundColor: themeVariant.map.peer,
      tension: 0.5,
      pointRadius: 2,
      borderWidth: 1,
    },
    {
      label: '2',
      data: [20, 30, 40, 50, 65, 50, 40, 50, 40],
      fill: true,
      borderColor: themeVariant.custom.green.light,
      backgroundColor: themeVariant.custom.green.light,
      tension: 0.5,
      pointRadius: 2,
      borderWidth: 1,
    },
    {
      label: '3',
      data: [30, 40, 50, 60, 70, 60, 45, 60, 50],
      fill: true,
      borderColor: themeVariant.custom.orange.light,
      backgroundColor: themeVariant.custom.orange.light,
      tension: 0.5,
      pointRadius: 2,
      borderWidth: 1,
    },
    {
      label: '4',
      data: [40, 50, 60, 70, 80, 70, 60, 70, 60],
      fill: true,
      borderColor: themeVariant.custom.red.light,
      backgroundColor: themeVariant.custom.red.light,
      tension: 0.5,
      pointRadius: 2,
      borderWidth: 1,
    },
  ],
});
