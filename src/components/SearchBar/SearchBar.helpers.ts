import * as ROUTES from '@utils/constants/routes';

export const ADDRESSES_LABEL = 'Addresses';
export const BLOCKS_HEIGHTS_LABEL = 'Blocks Heights';
export const BLOCKS_IDS_LABEL = 'Blocks Ids';
export const TRANSACTIONS_LABEL = 'Transactions';
export const SENSES_LABEL = 'Senses';
export const PASTEL_ID_LABEL = 'Pastel ID';
export const USERNAME = 'Username';

export type TOptionsCategories =
  | typeof ADDRESSES_LABEL
  | typeof BLOCKS_HEIGHTS_LABEL
  | typeof BLOCKS_IDS_LABEL
  | typeof TRANSACTIONS_LABEL
  | typeof SENSES_LABEL
  | typeof PASTEL_ID_LABEL
  | typeof USERNAME;

export const collectData = (data: Array<string | number>, category: TOptionsCategories) =>
  data?.map((item: string | number) => ({ value: `${item}`, category }));

export const collectUsernameData = (
  data: Array<{ pastelID: string; username: string }>,
  category: TOptionsCategories,
) =>
  data?.map((item: { pastelID: string; username: string }) => ({
    value: `${item.username}`,
    category,
    pastelID: item.pastelID,
  }));

export const getRoute = (optionType: TOptionsCategories) => {
  const routeTypes = {
    [ADDRESSES_LABEL]: ROUTES.ADDRESS_DETAILS,
    [BLOCKS_HEIGHTS_LABEL]: ROUTES.BLOCK_DETAILS,
    [BLOCKS_IDS_LABEL]: ROUTES.BLOCK_DETAILS,
    [TRANSACTIONS_LABEL]: ROUTES.TRANSACTION_DETAILS,
    [SENSES_LABEL]: ROUTES.SENSE_DETAILS,
    [PASTEL_ID_LABEL]: ROUTES.PASTEL_ID_DETAILS,
    [USERNAME]: ROUTES.PASTEL_ID_DETAILS,
  };

  return routeTypes[optionType] || ROUTES.NOT_FOUND;
};
