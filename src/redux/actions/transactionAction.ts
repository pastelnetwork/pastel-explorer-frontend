import { SET_LOADING_TRANSACTION, SET_LATEST_TRANSACTIONS } from '@redux/actions/actionTypes';
import { ITransaction } from '@utils/types/ITransactions';

export interface SetLoadingTransaction {
  type: typeof SET_LOADING_TRANSACTION;
  payload?: boolean;
}

export interface SetLatestTransactions {
  type: typeof SET_LATEST_TRANSACTIONS;
  payload: Map<string, ITransaction>;
}

export function setLoadingTransaction(payload = false) {
  return {
    type: SET_LOADING_TRANSACTION,
    payload,
  };
}

export function setLatestTransactions(payload: Map<string, ITransaction>) {
  return {
    type: SET_LATEST_TRANSACTIONS,
    payload,
  };
}

export type TransactionActionsTypes = SetLoadingTransaction | SetLatestTransactions;
