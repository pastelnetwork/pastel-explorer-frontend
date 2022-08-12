import themeVariant from '@theme/variants';

export const chartColors = [
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
      callbacks: {
        label(context: any) {
          let label = context.label || '';

          if (label) {
            label += ': ';
          }
          const totalSuperNodes =
            context?.dataset?.data?.reduce((a: number, b: number) => a + b, 0) || 1;
          if (context.dataset.data) {
            label = `${label} ${context.formattedValue}(${(
              (parseInt(context.formattedValue, 10) * 100) /
              totalSuperNodes
            ).toFixed(2)}%)`;
          }
          return label;
        },
      },
    },
  },
  cutout: '80%',
};
