import { ChartOptions } from 'chart.js';

import themeVariant from '@theme/variants';

export const chartVisualData = {
  datasets: [
    {
      label: 'GH/s',
      borderColor: themeVariant.palette.primary.main,
      tension: 0.1,
    },
  ],
};

export const chartOptions: ChartOptions = {
  plugins: { legend: { display: false } },
  scales: { x: { ticks: { maxTicksLimit: 10 } } },
};
