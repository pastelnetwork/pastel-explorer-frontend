export type DirectionType = 'Incoming' | 'Outgoing';

export interface TransactionEvent {
  amount: number;
  transactionHash: string;
  direction: DirectionType;
  address: string;
}

export interface ITransaction {
  block: {
    height: string;
  };
  // TODO delete after change movement fetch data to API V1
  total: string;
  // TODO delete after change movement fetch data to API V1
  txid: string;
  blockHash: string;
  coinbase: number;
  id: string;
  recipientCount: number;
  timestamp: number;
  totalAmount: number;
}

export interface ITransactionDetails extends ITransaction {
  transactionEvents: Array<TransactionEvent>;
}
