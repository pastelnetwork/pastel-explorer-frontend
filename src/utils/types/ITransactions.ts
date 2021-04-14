export interface ITransaction {
  blockhash: string;
  blockindex: number;
  timestamp: number;
  total: number;
  txid: string;
  vin: Array<{ addresses: string; amount: number }>;
  vout: Array<{ addresses: string; amount: number }>;
}
