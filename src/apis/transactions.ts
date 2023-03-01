import { axiosInstance } from '@utils/helpers/useFetch/useFetch';
import { TRANSACTION_URL } from '@utils/constants/urls';
import { ITransaction } from '@utils/types/ITransactions';

const getLatestTransactions = async (limit = 8) => {
  const {
    data: { data, timestamp },
  }: { data: { data: ITransaction[]; timestamp: number } } = await axiosInstance.get(
    TRANSACTION_URL,
    {
      params: { offset: 0, limit, sortBy: 'timestamp', sortDirection: 'DESC', excludePaging: true },
    },
  );

  const blockTuple: [string, ITransaction][] = data.map((block: ITransaction) => [block.id, block]);
  const mapDate = new Map(blockTuple);
  return { data: mapDate, timestamp };
};

export default { getLatestTransactions };
