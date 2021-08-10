import { useAppSelector } from '@redux/hooks/appHooks';
import { BLOCK_NAMESPACE, IBlockState } from '@redux/reducers/blockReducer';

// eslint-disable-next-line
export function useBlockSelector<T>(selector: (_state: IBlockState) => T): T {
  return useAppSelector(state => selector(state[BLOCK_NAMESPACE]));
}

export function useBlockLatestBlocks() {
  return useBlockSelector(state => state.latestBlocks);
}

export function useBlockIsLoading() {
  return useBlockSelector(state => state.isLoading);
}

export function useBlockTimestamp() {
  return useBlockSelector(state => state.timestamp);
}
