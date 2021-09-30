import * as React from 'react';
import { useSelector } from 'react-redux';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { defaultFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';
import { ITransaction } from '@utils/types/ITransactions';

import * as Styles from './LatestTransactions.styles';

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
  const filter = useSelector(getFilterState);
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
    filterBy = 'period',
    filterValue = filter.dateRange || '',
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;
    // Allow to sort by block height
    // In this situation if user will click on block column we need to sort by timestamp
    const fetchSortBy =
      fetchParams.current.sortBy === BLOCK_KEY ? TIMESTAMP_KEY : fetchParams.current.sortBy;
    const params: Record<string, string | number> = {
      offset,
      limit,
      sortBy: fetchSortBy,
      sortDirection,
      period: 'all',
    };
    if (filterValue && filterValue !== 'all') {
      params[filterBy] = filterValue;
    }

    return fetchTransactions
      .fetchData({ params })
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

  const handleSort = ({ sortBy, sortDirection, filterBy, filterValue }: ISortData) => {
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortDirection = sortDirection;
    const sortByValue = sortBy || fetchParams.current.sortBy;
    return handleFetchTransactions(
      fetchParams.current.offset,
      sortByValue,
      fetchParams.current.sortDirection,
      true,
      filterBy,
      filterValue,
    );
  };

  React.useEffect(() => {
    if (filter.dateRange) {
      fetchParams.current.offset = 0;
      handleFetchTransactions(
        0,
        fetchParams.current.sortBy,
        fetchParams.current.sortDirection,
        true,
        'period',
        filter.dateRange,
      );
    } else {
      handleFetchTransactions(
        fetchParams.current.offset,
        fetchParams.current.sortBy,
        fetchParams.current.sortDirection,
      );
    }
  }, [filter.dateRange]);

  return (
    <Styles.LatestTransactionsWrapper>
      <InfinityTable
        sortBy={fetchParams.current.sortBy}
        sortDirection={fetchParams.current.sortDirection}
        // loadMoreFrom={fetchParams.current.offset + 20}
        rows={transactionList}
        columns={columns}
        tableHeight={650}
        filters={defaultFilters}
        title="Latest Transactions"
        onBottomReach={handleFetchMoreTransactions}
        onHeaderClick={handleSort}
      />
    </Styles.LatestTransactionsWrapper>
  );
};

export default LatestTransactions;
