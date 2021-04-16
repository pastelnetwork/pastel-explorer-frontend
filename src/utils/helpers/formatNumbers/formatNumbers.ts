export const formatNumber = (
  total: number | string,
  options: { decimalsLength?: number; currency?: string; divideToAmmount?: boolean } = {
    decimalsLength: 0,
    currency: 'en-US',
    divideToAmmount: false,
  },
) => {
  const totalToNumber = Number(total);
  const value = options.divideToAmmount ? totalToNumber / 100000000 : totalToNumber;
  return value.toLocaleString(options.currency, {
    minimumFractionDigits: options.decimalsLength,
    maximumFractionDigits: options.decimalsLength,
  });
};
