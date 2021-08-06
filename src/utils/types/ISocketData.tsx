import { IRawTransactions } from './ITransactions';
import { IBlock } from './IBlocks';

export interface ISocketData {
  unconfirmedTransactions?: IRawTransactions[];
  rawTransactions?: IRawTransactions[];
  blocks: IBlock[];
}
