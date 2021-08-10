import { useAppSelector } from '@redux/hooks/appHooks';
import { TRANSACTION_NAMESPACE, ITransactionState } from '@redux/reducers/transactionReducer';
import { ITransaction } from '@utils/types/ITransactions';

export function useTransactionSelector<T>(selector: (_state: ITransactionState) => T): T {
  return useAppSelector(state => selector(state[TRANSACTION_NAMESPACE]));
}

export function useTransactionLatestTransactions() {
  return useTransactionSelector<Map<string, ITransaction>>(state => state.latestTransaction);
}

export function useTransactionIsLoading() {
  return useTransactionSelector(state => state.isLoading);
}
