import { AppThunk } from '@redux/types';
import { setLoadingTransaction, setLatestTransactions } from '@redux/actions/transactionAction';
import transactionApis from '@apis/transactions';
import { setResponseError } from '@redux/actions/responseErrorsActions';
import { TRANSACTION_NAMESPACE, ITransactionState } from '@redux/reducers/transactionReducer';
import { ISocketData } from '@utils/types/ISocketData';
import { setTransactionsLive } from '@utils/helpers/statisticsLib';

export const getLatestBlocks: () => AppThunk<Promise<void>> =
  (limit = 6) =>
  async (
    dispatch,
    // _getState,
  ): Promise<void> => {
    try {
      dispatch(setLoadingTransaction());

      const { data } = await transactionApis.getLatestTransactions(limit);

      dispatch(setLatestTransactions(data));
      dispatch(setResponseError(false));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setResponseError(true, error.message));
      }
    }
  };

export const updateTransactionsNewest: (_rawTransactions: ISocketData) => AppThunk<Promise<void>> =
  data =>
  async (dispatch, getState): Promise<void> => {
    const prevBlocks = (getState()[TRANSACTION_NAMESPACE] as ITransactionState).latestTransaction;
    const newBlocks = setTransactionsLive(prevBlocks, data);
    dispatch(setLatestTransactions(newBlocks));
  };

export default {
  getLatestBlocks,
  updateTransactionsNewest,
};
