import { AppThunk } from '@redux/types';
import { setLoadingBlock, setLatestBlocks } from '@redux/actions/blocksAction';
import blockApis from '@apis/blocks';
import { setResponseError } from '@redux/actions/responseErrorsActions';
import { IBlock, IRawBlock } from '@utils/types/IBlocks';
import { BLOCK_NAMESPACE } from '@redux/reducers/blockReducer';

export const getLatestBlocks: () => AppThunk<Promise<void>> = (limit = 6) => async (
  dispatch,
  // _getState,
): Promise<void> => {
  try {
    dispatch(setLoadingBlock());

    const { data, timestamp } = await blockApis.getLatestBlock(limit);

    dispatch(setLatestBlocks({ latestBlocks: data, timestamp }));
    dispatch(setResponseError(false));
  } catch (error) {
    dispatch(setResponseError(true, error.message));
  }
};

export const updateBlocksNewest: (_block: IRawBlock) => AppThunk<Promise<void>> = block => async (
  dispatch,
  getState,
): Promise<void> => {
  const prevBlocks = getState()[BLOCK_NAMESPACE].latestBlocks;
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
    totalTickets: block.totalTickets,
    tickets: block.tickets,
  });
  let i = 1;
  prevBlocks.forEach((value, key) => {
    if (i < 6) {
      newBlocks.set(key, value);
    }
    i += 1;
  });
  dispatch(setLatestBlocks({ latestBlocks: newBlocks }));
};

export default {
  getLatestBlocks,
  updateBlocksNewest,
};
