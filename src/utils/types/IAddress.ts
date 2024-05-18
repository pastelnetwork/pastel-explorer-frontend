export interface IAddressData {
  amount: number;
  timestamp: number;
  transactionHash: string;
  direction: string;
}

export interface IAddress {
  address: string;
  incomingSum: number;
  outgoingSum: number;
  data: Array<IAddressData>;
}

export interface ITransactionAddress {
  address: string;
  transactionHash: string;
  amount: number;
  direction: string;
  preTotal: number;
  total: number;
}
