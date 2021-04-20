export interface ISearchResponse {
  data: {
    address: Array<string>;
    blocksHeights: Array<string | number>;
    blocksIds: Array<string>;
    transactions: Array<string>;
  };
}
