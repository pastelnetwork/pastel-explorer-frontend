import themeVariant from '@theme/variants';

export const CHART_HEIGHT = 386;

export const generateTransactionsData = (labels: Array<string>, data: Array<number>) => ({
  labels,
  datasets: [
    {
      label: 'Transactions',
      data,
      fill: false,
      borderColor: themeVariant.map.peer,
      tension: 0.1,
      pointRadius: 2,
      borderWidth: 1,
    },
  ],
});

export const sortTransactions = (transactions: Array<[number, number]>) => {
  return transactions.sort(([valueA], [valueB]) => {
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });
};
