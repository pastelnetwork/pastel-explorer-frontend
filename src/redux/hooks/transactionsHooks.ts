import { useAppSelector } from '@redux/hooks/appHooks';
import { TRANSACTION_NAMESPACE, ITransactionState } from '@redux/reducers/transactionReducer';

// eslint-disable-next-line
export function useTransactionSelector<T extends (_state: ITransactionState) => any>(
  selector: T,
): ReturnType<T> {
  return useAppSelector(state => selector(state[TRANSACTION_NAMESPACE]));
}

export function useTransactionLatestTransactions() {
  return useTransactionSelector(state => state.latestTransaction);
}

export function useTransactionIsLoading() {
  return useTransactionSelector(state => state.isLoading);
}
