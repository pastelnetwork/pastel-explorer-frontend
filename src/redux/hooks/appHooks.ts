import { useSelector } from 'react-redux';

import { RootState } from '@redux/store';

// eslint-disable-next-line
export function useAppSelector<T extends (_state: RootState) => any>(selector: T): ReturnType<T> {
  return useSelector(selector);
}
