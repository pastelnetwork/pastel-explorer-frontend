import * as ROUTES from '@utils/constants/routes';

export const ADDRESSES_TEXT_LABEL = 'components.searchBar.addresses';
export const BLOCKS_HEIGHTS_TEXT_LABEL = 'components.searchBar.blocksHeights';
export const BLOCKS_IDS_TEXT_LABEL = 'components.searchBar.blocksIds';
export const TRANSACTIONS_TEXT_LABEL = 'components.searchBar.transactions';
export const SENSES_TEXT_LABEL = 'components.searchBar.senses';
export const PASTEL_ID_TEXT_LABEL = 'components.searchBar.pastelID';
export const USERNAME_TEXT_LABEL = 'components.searchBar.username';
export const COLLECTION_LABEL = 'components.searchBar.collection';
export const CASCADE_LABEL = 'components.searchBar.cascade';

export const ADDRESSES_LABEL = 'addresses';
export const BLOCKS_HEIGHTS_LABEL = 'blocksHeights';
export const BLOCKS_IDS_LABEL = 'blocksIds';
export const TRANSACTIONS_LABEL = 'transactions';
export const SENSES_LABEL = 'senses';
export const PASTEL_ID_LABEL = 'pastelID';
export const USERNAME = 'username';
export const COLLECTION = 'collection';
export const CASCADE = 'cascade';

export type TOptionsCategories =
  | typeof ADDRESSES_LABEL
  | typeof BLOCKS_HEIGHTS_LABEL
  | typeof BLOCKS_IDS_LABEL
  | typeof TRANSACTIONS_LABEL
  | typeof SENSES_LABEL
  | typeof PASTEL_ID_LABEL
  | typeof COLLECTION
  | typeof CASCADE
  | typeof USERNAME;

export type TAutocompleteOptions = {
  category: TOptionsCategories;
  value: string;
  categoryText: string;
  pastelID: string;
  alias: string;
  transactionHash: string;
};

export const collectData = (
  data: Array<string | number>,
  category: TOptionsCategories,
  categoryText: TOptionsCategories,
) => data?.map((item: string | number) => ({ value: `${item}`, category, categoryText }));

export const collectUsernameData = (
  data: Array<{ pastelID: string; username: string }>,
  category: TOptionsCategories,
  categoryText: TOptionsCategories,
) =>
  data?.map((item: { pastelID: string; username: string }) => ({
    value: `${item.username}`,
    category,
    categoryText,
    pastelID: item.pastelID,
  }));

export const collectCollectionData = (
  data: Array<{ name: string; alias: string }>,
  category: TOptionsCategories,
  categoryText: TOptionsCategories,
) =>
  data?.map((item: { name: string; alias: string }) => ({
    value: `${item.name}`,
    category,
    categoryText,
    alias: item.alias,
  }));

export const collectCascadeData = (
  data: Array<{ transactionHash: string; cascadeFileName: string }>,
  category: TOptionsCategories,
  categoryText: TOptionsCategories,
) =>
  data?.map((item: { transactionHash: string; cascadeFileName: string }) => ({
    value: `${item.cascadeFileName}`,
    category,
    categoryText,
    transactionHash: item.transactionHash,
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
    [COLLECTION]: ROUTES.COLLECTION_DETAILS_PAGE,
    [CASCADE]: ROUTES.CASCADE_DETAILS,
  };
  return routeTypes[optionType] || ROUTES.NOT_FOUND;
};
