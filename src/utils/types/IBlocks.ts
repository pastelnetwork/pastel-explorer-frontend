import { ITicket, TSenseRequests } from './ITransactions';
import { ITransactionAddress } from './IAddress';

export interface IBlockTransaction {
  id: string;
  recipientCount: number;
  totalAmount: number;
  isNonStandard?: boolean;
  tickets: string;
  totalTickets: number;
  ticketsTotal: number;
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
  totalTickets: number;
  tickets: ITicket[];
  ticketsList: string;
  senses: TSenseRequests[];
  type?: string;
  addresses?: ITransactionAddress[];
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
  totalTickets: number;
  tickets: ITicket[];
  ticketsList: string;
  senses: TSenseRequests[];
  type?: string;
}
