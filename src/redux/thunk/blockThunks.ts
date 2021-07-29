import { AppThunk } from '@redux/types';
import { setLoadingBlock, setLastestBlocks } from '@redux/actions/blocksAction';
import blockApis from '@apis/blocks';
import { setResponseError } from '@redux/actions/responseErrorsActions';
import { IBlock, IRawBlock } from '@utils/types/IBlocks';
import { BLOCK_NAMESPACE } from '@redux/reducers/blockReducer';

export const getLastestBlocks: () => AppThunk<Promise<void>> = (limit = 6) => async (
  dispatch,
  // _getState,
): Promise<void> => {
  try {
    dispatch(setLoadingBlock());

    const { data, timestamp } = await blockApis.getLastestBlock(limit);

    dispatch(setLastestBlocks({ lastestBlocks: data, timestamp }));
  } catch (error) {
    dispatch(setResponseError(true, error.message));
  }
};

export const updateBlocksNewest: (_block: IRawBlock) => AppThunk<Promise<void>> = block => async (
  dispatch,
  getState,
): Promise<void> => {
  const prevBlocks = getState()[BLOCK_NAMESPACE].lastestBlocks;
  const newBlocks = new Map<string, IBlock>();
  newBlocks.set(block.hash, {
    id: block.hash,
    difficulty: block.difficulty,
    confirmations: block.confirmations,
    height: block.height,
    merkleRoot: block.merkleroot,
    nextBlockHash: '',
    nonce: block.nonce,
    previousBlockHash: block.previousblockhash,
    size: block.size,
    solution: block.solution,
    timestamp: block.time,
    transactionCount: block.transactions.length,
    transactions: block.transactions,
  });
  let i = 1;
  prevBlocks.forEach((value, key) => {
    if (i < 6) {
      newBlocks.set(key, value);
    }
    i += 1;
  });
  dispatch(setLastestBlocks({ lastestBlocks: newBlocks }));
  Promise.resolve();
};

export default {
  getLastestBlocks,
  updateBlocksNewest,
};
