export interface IAddressData {
  amount: number;
  timestamp: number;
  transactionHash: string;
}

export interface IAddress {
  address: string;
  incomingSum: number;
  outgoingSum: number;
  data: Array<IAddressData>;
}
