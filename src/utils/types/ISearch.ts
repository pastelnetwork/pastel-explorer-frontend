export interface ISearchResponse {
  data: {
    address: Array<string>;
    blocksHeights: Array<string | number>;
    blocksIds: Array<string>;
    transactions: Array<string>;
    senses: Array<string>;
    pastelIds: Array<string>;
    usernameList: Array<{ pastelID: string; username: string }>;
    collectionNameList: Array<{ name: string; alias: string }>;
    cascadeList: Array<{ transactionHash: string; cascadeFileName: string }>;
  };
}
