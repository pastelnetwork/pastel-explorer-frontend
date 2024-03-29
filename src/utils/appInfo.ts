export const DEFAULT_CURRENCY = process.env.REACT_APP_EXPLORER_DEFAULT_CURRENCY_NAME || 'PSL';
export const TEST_CURRENCY_NAME = process.env.REACT_APP_EXPLORER_TEST_CURRENCY_NAME || 'LSP';
const PASTEL_BURN_ADDRESS = process.env.REACT_APP_EXPLORER_PASTEL_BURN_ADDRESS || '';
export const HIDE_TO_BLOCK = Number(process.env.REACT_APP_EXPLORER_HIDE_TO_BLOCK) || 0;

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

export const isPastelBurnAddress = (address: string): boolean => {
  if (PASTEL_BURN_ADDRESS) {
    const pastelBurnAddresses = PASTEL_BURN_ADDRESS.split(',');
    return pastelBurnAddresses.includes(address);
  }

  return false;
};

export const getPastelBurnAddresses = (): string[] => {
  if (PASTEL_BURN_ADDRESS) {
    const pastelBurnAddresses = PASTEL_BURN_ADDRESS.split(',');
    return pastelBurnAddresses;
  }

  return [];
};
