import themeVariant from '@theme/variants';

export const chartVisualData = {
  datasets: [
    {
      label: 'GH/s',
      fill: false,
      borderColor: themeVariant.map.peer,
      tension: 0.1,
      pointRadius: 0.1,
      borderWidth: 1,
    },
  ],
};
