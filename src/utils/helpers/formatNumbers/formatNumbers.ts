export const formatNumber = (
  total: number | string,
  options: { decimalsLength?: number; currency?: string; divideToAmount?: boolean } = {
    decimalsLength: 0,
    currency: 'en-US',
    divideToAmount: false,
  },
  prefix = '',
) => {
  const totalToNumber = Number(total);
  const value = options.divideToAmount ? totalToNumber / 100000000 : totalToNumber;
  const valueString = value.toLocaleString(options.currency, {
    minimumFractionDigits: options.decimalsLength,
    maximumFractionDigits: options.decimalsLength,
  });
  return `${prefix}${valueString}`;
};
