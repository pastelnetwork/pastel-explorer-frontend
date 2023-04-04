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
