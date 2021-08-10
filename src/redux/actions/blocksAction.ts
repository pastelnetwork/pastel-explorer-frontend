import {
  SET_LATEST_BLOCKS,
  UPDATE_BLOCKS_NEWEST,
  SET_LOADING_BLOCK,
} from '@redux/actions/actionTypes';
import { IBlock, IRawBlock } from '@utils/types/IBlocks';

export interface SetLatestBlocks {
  type: typeof SET_LATEST_BLOCKS;
  payload: { latestBlocks: Map<string, IBlock>; timestamp?: number };
}

export interface UpdateBlocksNewest {
  type: typeof UPDATE_BLOCKS_NEWEST;
  payload: IRawBlock;
}

export interface SetLoadingBlock {
  type: typeof SET_LOADING_BLOCK;
  payload?: boolean;
}

export function setLatestBlocks(payload: {
  latestBlocks: Map<string, IBlock>;
  timestamp?: number;
}): SetLatestBlocks {
  return {
    type: SET_LATEST_BLOCKS,
    payload,
  };
}

export function updateBlocksNewest(payload: IRawBlock): UpdateBlocksNewest {
  return {
    type: UPDATE_BLOCKS_NEWEST,
    payload,
  };
}

export function setLoadingBlock(payload = false): SetLoadingBlock {
  return {
    type: SET_LOADING_BLOCK,
    payload,
  };
}

export type BlocksActionsTypes = SetLatestBlocks | UpdateBlocksNewest | SetLoadingBlock;
