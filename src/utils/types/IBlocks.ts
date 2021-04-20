export interface IBlockTransaction {
  id: string;
  recipientCount: number;
  totalAmount: number;
}

export interface IBlock {
  confirmations: number;
  difficulty: string;
  height: number;
  id: string;
  merkleRoot: string;
  nextBlockHash: string;
  nonce: string;
  previousBlockHash: string;
  size: number;
  solution: string;
  timestamp: number;
  transactionCount: number;
  transactions: Array<IBlockTransaction>;
}
