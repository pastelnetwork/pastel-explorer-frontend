import * as ROUTES from '@utils/constants/routes';

export const ADDRESSES_LABEL = 'Addresses';
export const BLOCKS_HEIGHTS_LABEL = 'Blocks Heights';
export const BLOCKS_IDS_LABEL = 'Blocks Ids';
export const TRANSACTIONS_LABEL = 'Transactions';

export type TOptionsCategories =
  | typeof ADDRESSES_LABEL
  | typeof BLOCKS_HEIGHTS_LABEL
  | typeof BLOCKS_IDS_LABEL
  | typeof TRANSACTIONS_LABEL;

export const collectData = (data: Array<string | number>, category: TOptionsCategories) =>
  data.map((item: string | number) => ({ value: `${item}`, category }));

export const getRoute = (optionType: TOptionsCategories) => {
  const routeTypes = {
    [ADDRESSES_LABEL]: ROUTES.ADDRESS_DETAILS,
    [BLOCKS_HEIGHTS_LABEL]: ROUTES.BLOCK_DETAILS,
    [BLOCKS_IDS_LABEL]: ROUTES.BLOCK_DETAILS,
    [TRANSACTIONS_LABEL]: ROUTES.TRANSACTION_DETAILS,
  };

  return routeTypes[optionType] || ROUTES.NOT_FOUND;
};
