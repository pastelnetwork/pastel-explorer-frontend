import * as React from 'react';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';

import { ITransaction } from '@utils/types/ITransactions';

import { BLOCK_KEY, columns, TIMESTAMP_KEY } from './LatestTransactions.columns';
import {
  transformTransactionsData,
  DATA_FETCH_LIMIT,
  DATA_OFFSET,
  DATA_DEFAULT_SORT,
} from './LatestTransactions.helpers';

interface ITransactionDataRef {
  offset: number;
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const LatestTransactions: React.FC = () => {
  const fetchParams = React.useRef<ITransactionDataRef>({
    offset: DATA_OFFSET,
    sortBy: TIMESTAMP_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps>>([]);
  const fetchTransactions = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: URLS.TRANSACTION_URL,
  });

  const handleFetchTransactions = (
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
    replaceData = false,
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;
    // Allow to sort by block height
    // In this situation if user will click on block column we need to sort by timestamp
    const fetchSortBy =
      fetchParams.current.sortBy === BLOCK_KEY ? TIMESTAMP_KEY : fetchParams.current.sortBy;

    return fetchTransactions
      .fetchData({ params: { offset, limit, sortBy: fetchSortBy, sortDirection } })
      .then(response => (response ? transformTransactionsData(response.data) : []))
      .then(data =>
        replaceData
          ? setTransactionList(data)
          : setTransactionList(prevState => [...prevState, ...data]),
      );
  };

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    fetchParams.current.offset += DATA_FETCH_LIMIT;

    return handleFetchTransactions(
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortDirection = sortDirection;

    return handleFetchTransactions(
      fetchParams.current.offset,
      sortBy,
      fetchParams.current.sortDirection,
      true,
    );
  };

  React.useEffect(() => {
    handleFetchTransactions(
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  }, []);

  return (
    <InfinityTable
      sortBy={fetchParams.current.sortBy}
      sortDirection={fetchParams.current.sortDirection}
      rows={transactionList}
      columns={columns}
      tableHeight={650}
      title="Latest Transactions"
      onBottomReach={handleFetchMoreTransactions}
      onHeaderClick={handleSort}
    />
  );
};

export default LatestTransactions;
