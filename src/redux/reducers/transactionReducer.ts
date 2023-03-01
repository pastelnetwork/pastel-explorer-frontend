import * as types from '@redux/actions/actionTypes';
import { ITransaction } from '@utils/types/ITransactions';
import { TransactionActionsTypes } from '@redux/actions/transactionAction';

export const TRANSACTION_NAMESPACE = 'transaction';

export interface ITransactionState {
  latestTransaction: Map<string, ITransaction>;
  isLoading: boolean;
}

const initialState: ITransactionState = {
  latestTransaction: new Map(),
  isLoading: true,
};

const reducer = (state: ITransactionState = initialState, actions: TransactionActionsTypes) => {
  switch (actions.type) {
    case types.SET_LOADING_TRANSACTION:
      return { ...state, isLoading: true };
    case types.SET_LATEST_TRANSACTIONS:
      return { ...state, latestTransaction: actions.payload, isLoading: false };
    default:
      return state;
  }
};

export default { [TRANSACTION_NAMESPACE]: reducer };
