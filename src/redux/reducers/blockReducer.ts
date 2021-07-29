import * as types from '@redux/actions/actionTypes';
import { IBlock } from '@utils/types/IBlocks';
import { BlocksActionsTypes } from '@redux/actions/blocksAction';

export const BLOCK_NAMESPACE = 'block';

export interface IBlockState {
  lastestBlocks: Map<string, IBlock>;
  isLoading: boolean;
  timestamp: number | null;
}

const inititalState: IBlockState = {
  lastestBlocks: new Map(),
  isLoading: true,
  timestamp: null,
};

const reducer = (state: IBlockState = inititalState, actions: BlocksActionsTypes) => {
  switch (actions.type) {
    case types.SET_LOADING_BLOCK:
      return { ...state, isLoading: true };
    case types.SET_LASTEST_BLOCKS:
      return { ...state, ...actions.payload, isLoading: false };
    default:
      return state;
  }
};

export default { [BLOCK_NAMESPACE]: reducer };
