export const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY_NAME || 'PSL';
export const TEST_CURRENCY_NAME = process.env.TEST_CURRENCY_NAME || 'LSP';

export const getCurrencyName = (): string => {
  const persist = localStorage.getItem('persist:root');

  if (persist) {
    try {
      const store = JSON.parse(persist);
      const tmp = JSON.parse(store.cluster);
      return tmp.currencyName || DEFAULT_CURRENCY;
    } catch {
      return DEFAULT_CURRENCY;
    }
  }

  return DEFAULT_CURRENCY;
};
