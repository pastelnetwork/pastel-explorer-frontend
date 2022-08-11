import themeVariant from '@theme/variants';

export const chartColor = [
  themeVariant.palette.primary.main,
  themeVariant.palette.secondary.main,
  themeVariant.custom.green.light,
  themeVariant.custom.red.light,
  themeVariant.custom.orange.light,
  themeVariant.custom.green.dark,
  themeVariant.custom.red.dark,
  themeVariant.custom.orange.dark,
];

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
  cutout: '80%',
};
