import { IRawTransactions } from './ITransactions';
import { IRawBlock } from './IBlocks';

export interface ISocketData {
  unconfirmedTransactions?: IRawTransactions[];
  rawTransactions?: IRawTransactions[];
  blocks: IRawBlock[];
}
