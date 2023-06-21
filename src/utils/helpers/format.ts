import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

export const formatAddress = (address: string, length = 20, endLength = -6): string => {
  return `${address.substr(0, length)}...${address.substr(endLength)}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${formatNumber(parseFloat((bytes / k ** i).toFixed(dm)), { decimalsLength: dm })} ${
    sizes[i]
  }`;
};
