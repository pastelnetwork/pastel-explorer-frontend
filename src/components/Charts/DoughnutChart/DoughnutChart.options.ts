import themeVariant from '@theme/variants';

export const defaultChartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: themeVariant.palette.text.primary,
    },
  },
  cutout: '70%',
};
