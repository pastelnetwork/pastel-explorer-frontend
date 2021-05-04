import themeVariant from '@theme/variants';

export const chartVisualData = {
  datasets: [
    {
      label: 'GH/s',
      fill: false,
      borderColor: themeVariant.map.peer,
      tension: 0.1,
      pointRadius: 2,
      borderWidth: 1,
    },
  ],
};
