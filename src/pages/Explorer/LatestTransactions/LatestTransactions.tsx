import * as React from 'react';

import RouterLink from '@components/RouterLink/RouterLink';
import InfinityTable, { RowsProps } from '@components/InfinityTable/InfinityTable';

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
  },
  {
    width: 360,
    flexGrow: 1,
    label: 'Hash',
    dataKey: 'hash',
  },
  {
    width: 20,
    flexGrow: 1,
    label: 'Recipents',
    dataKey: 'recipents',
  },
  {
    width: 60,
    flexGrow: 1,
    label: 'Amount (PSL)',
    dataKey: 'amount',
  },
  {
    width: 150,
    flexGrow: 1,
    label: 'Timestamp',
    dataKey: 'timestamp',
  },
];

const DATA_FETCH_LIMIT = 100;
const DATA_OFFSET = 0;

const LatestTransactions: React.FC = () => {
  const transactionsFetchData = React.useRef({ limit: DATA_FETCH_LIMIT, offset: DATA_OFFSET });
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
        hash: <RouterLink route={`${ROUTES.TRANSACTION_DETAILS}/${id}`} value={id} />,
        recipents: recipientCount,
        amount: formatNumber(totalAmount, { decimalsLength: 2 }),
        timestamp: formattedDate(timestamp),
      }),
    );

    setTransactionList(prevState => [...prevState, ...transformedTransactions]);
  };

  const handleFetchTransactions = (limit: number, offset: number) =>
    fetchTransactions
      .fetchData({ params: { offset, limit, sortBy: 'timestamp' } })
      .then(response => {
        if (!response) return null;
        return transformTransactionsData(response.data);
      });

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    transactionsFetchData.current.offset += transactionsFetchData.current.limit;
    return handleFetchTransactions(
      transactionsFetchData.current.limit,
      transactionsFetchData.current.offset,
    );
  };

  React.useEffect(() => {
    handleFetchTransactions(
      transactionsFetchData.current.limit,
      transactionsFetchData.current.offset,
    );
  }, []);

  return (
    <InfinityTable
      rows={transactionList}
      columns={columns}
      title="Latest Transactions"
      onBottomReach={handleFetchMoreTransactions}
    />
  );
};

export default LatestTransactions;
