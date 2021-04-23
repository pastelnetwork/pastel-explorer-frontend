import * as React from 'react';

import RouterLink from '@components/RouterLink/RouterLink';
import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import { ITransaction } from '@utils/types/ITransactions';

const columns = [
  {
    width: 30,
    flexGrow: 1,
    label: 'Block',
    dataKey: 'block',
    disableSort: true,
  },
  {
    width: 360,
    flexGrow: 1,
    label: 'Hash',
    dataKey: 'blockHash',
    disableSort: false,
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'Recipents',
    dataKey: 'recipientCount',
    disableSort: false,
  },
  {
    width: 60,
    flexGrow: 1,
    label: 'Amount (PSL)',
    dataKey: 'totalAmount',
    disableSort: false,
  },
  {
    width: 150,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: 'timestamp',
    disableSort: false,
  },
];

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
    sortBy: 'timestamp',
    sortDirection: 'DESC',
  });
  const [transactionList, setTransactionList] = React.useState<Array<RowsProps>>([]);
  const fetchTransactions = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: `${URLS.TRANSACTION_URL}`,
  });

  const transformTransactionsData = (transactions: Array<ITransaction>) => {
    const transformedTransactions = transactions.map(
      ({ blockHash, id, block, recipientCount, timestamp, totalAmount }) => ({
        id,
        block: <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`} value={block.height} />,
        blockHash: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${id}`} value={id} />,
        recipientCount,
        totalAmount: formatNumber(totalAmount, { decimalsLength: 2 }),
        timestamp: formattedDate(timestamp),
      }),
    );

    setTransactionList(prevState => [...prevState, ...transformedTransactions]);
  };

  const handleFetchTransactions = (
    limit: number,
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
  ) =>
    fetchTransactions
      .fetchData({ params: { offset, limit, sortBy, sortDirection } })
      .then(response => {
        if (!response) return null;
        return transformTransactionsData(response.data);
      });

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    fetchParams.current.offset += fetchParams.current.limit;
    return handleFetchTransactions(
      fetchParams.current.limit,
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.limit = DATA_FETCH_LIMIT;
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortBy = sortBy;
    fetchParams.current.sortDirection = sortDirection;

    setTransactionList([]);

    return handleFetchTransactions(
      fetchParams.current.limit,
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
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
