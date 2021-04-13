export interface ILastTransactionsResponse {
  data: {
    blockhash: string;
    blockindex: number;
    timestamp: number;
    total: number;
    txid: string;
    vin: { addresses: string; amount: number }[];
    vout: { addresses: string; amount: number }[];
  }[];
}

export interface ITransactionProps {
  blockhash: string;
  blockindex: number;
  timestamp: number;
  total: number;
  txid: string;
  vin: Array<{ addresses: string; amount: number }>;
  vout: Array<{ addresses: string; amount: number }>;
}

export type ITransactionsType = Array<ITransactionProps>;
