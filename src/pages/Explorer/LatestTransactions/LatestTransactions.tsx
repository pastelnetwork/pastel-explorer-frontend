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
import { transformTransactionsData } from './LatestTransactions.helpers';

const DATA_FETCH_LIMIT = 100;
const DATA_OFFSET = 0;

interface ITransactionDataRef {
  limit: number;
  offset: number;
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const LatestTransactions: React.FC = () => {
  const fetchParams = React.useRef<ITransactionDataRef>({
    limit: DATA_FETCH_LIMIT,
    offset: DATA_OFFSET,
    sortBy: TIMESTAMP_KEY,
    sortDirection: 'DESC',
  });
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps>>([]);
  const fetchTransactions = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: `${URLS.TRANSACTION_URL}`,
  });

  const handleFetchTransactions = (
    limit: number,
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
    replaceData = false,
  ) =>
    fetchTransactions
      .fetchData({ params: { offset, limit, sortBy, sortDirection } })
      .then(response => (response ? transformTransactionsData(response.data) : []))
      .then(data =>
        replaceData
          ? setTransactionList(data)
          : setTransactionList(prevState => [...prevState, ...data]),
      );

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    fetchParams.current.offset += fetchParams.current.limit;
    // Allow to sort by block height
    // In this situation if user will click on block column we need to sort by timestamp
    const fetchSortBy =
      fetchParams.current.sortBy === BLOCK_KEY ? TIMESTAMP_KEY : fetchParams.current.sortBy;

    return handleFetchTransactions(
      fetchParams.current.limit,
      fetchParams.current.offset,
      fetchSortBy,
      fetchParams.current.sortDirection,
    );
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.limit = DATA_FETCH_LIMIT;
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortBy = sortBy;
    fetchParams.current.sortDirection = sortDirection;

    // Allow to sort by block height
    // In this situation if user will click on block column we need to sort by timestamp
    const fetchSortBy = sortBy === BLOCK_KEY ? TIMESTAMP_KEY : sortBy;

    return handleFetchTransactions(
      fetchParams.current.limit,
      fetchParams.current.offset,
      fetchSortBy,
      fetchParams.current.sortDirection,
      true,
    );
  };

  React.useEffect(() => {
    handleFetchTransactions(
      fetchParams.current.limit,
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
      title="Latest Transactions"
      onBottomReach={handleFetchMoreTransactions}
      onHeaderClick={handleSort}
    />
  );
};

export default LatestTransactions;
