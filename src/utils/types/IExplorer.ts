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
