export const formatAddress = (address: string, length = 20, endLength = -6): string => {
  return `${address.substr(0, length)}...${address.substr(endLength)}`;
};
