export interface IBlockTransaction {
  id: string;
  recipientCount: number;
  totalAmount: number;
  isNonStandard?: boolean;
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

export interface IRawBlock {
  anchor: string;
  bits: string;
  chainwork: string;
  confirmations: number;
  difficulty: string;
  finalsaplingroot: string;
  hash: string;
  height: number;
  merkleroot: string;
  nonce: string;
  previousblockhash: string;
  size: number;
  solution: string;
  time: number;
  transactions: Array<IBlockTransaction>;
  tx: string[];
}
