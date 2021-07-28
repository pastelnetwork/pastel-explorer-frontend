export type DirectionType = 'Incoming' | 'Outgoing';

export interface TransactionEvent {
  amount: number;
  transactionHash: string;
  direction: DirectionType;
  address: string;
}

export interface BlockUnconfirmed {
  fee: number;
  size: number;
  height: string | number;
  txsCount: number;
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
  rawData: string;
  size: number;
  fee: number;
  height: number;
}

export interface ITransactionDetails extends ITransaction {
  transactionEvents: Array<TransactionEvent>;
}

export interface ITransactionVout {
  n: number;
  scriptPubKey: {
    addresses: string[];
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
  };
  value: number;
  valueZat: number;
}

export interface ITransactionVin {
  coinbase: string;
  sequence: number;
}

export interface IRawTransactions {
  blockhash: string | null;
  blocktime: number;
  confirmations: number;
  expiryheight: number;
  hex: string;
  locktime: number;
  overwintered: boolean;
  time: number;
  txid: string;
  vShieldedOutput: unknown[];
  vShieldedSpend: unknown[];
  valueBalance: number;
  version: number;
  versiongroupid: string;
  vin: ITransactionVin[];
  vout: ITransactionVout[];
  vjoinsplit: unknown[];
  fee?: number;
  height?: number;
  size?: number;
}
export type ITransactionState = IRawTransactions & { pslPrice: number; recepients: number };
