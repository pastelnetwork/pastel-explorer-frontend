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
    confirmations: number;
  };
  blockHash: string;
  coinbase: number;
  id: string;
  recipientCount: number;
  timestamp: number;
  totalAmount: number;
  isNonStandard: number | null;
}

export interface ITransactionDetails extends ITransaction {
  transactionEvents: Array<TransactionEvent>;
}
