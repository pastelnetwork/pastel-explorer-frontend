import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState } from '@redux/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppSelector: TypedUseSelectorHook<RootState | any> = useSelector;
