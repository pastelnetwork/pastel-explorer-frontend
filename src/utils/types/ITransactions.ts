interface vType {
  addresses: string;
  amount: number;
}

export interface ITransaction {
  blockhash: string;
  blockindex: number;
  timestamp: number;
  total: number;
  txid: string;
  vin: Array<vType>;
  vout: Array<vType>;
}
