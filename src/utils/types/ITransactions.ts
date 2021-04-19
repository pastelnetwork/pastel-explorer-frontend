interface vType {
  addresses: string;
  amount: number;
}

export type DirectionType = 'Incoming' | 'Outgoing';

export interface TransactionEvent {
  amount: number;
  transactionHash: string;
  direction: DirectionType;
  address: string;
}

export interface ITransaction {
  blockhash: string;
  blockindex: number;
  timestamp: number;
  total: number;
  txid: string;
  vin: Array<vType>;
  vout: Array<vType>;
  coinbase: number;
  id: string;
  transactionEvents: Array<TransactionEvent>;
  blockHash: string;
}
