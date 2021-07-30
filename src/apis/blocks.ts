import { axiosInstance } from '@utils/helpers/useFetch/useFetch';
import { BLOCK_URL } from '@utils/constants/urls';
import { IBlock } from '@utils/types/IBlocks';

const getLatestBlock = async (limit = 8) => {
  const {
    data: { data, timestamp },
  }: { data: { data: IBlock[]; timestamp: number } } = await axiosInstance.get(BLOCK_URL, {
    params: { limit },
  });

  const blockTuple: [string, IBlock][] = data.map((block: IBlock) => [block.id, block]);
  const mapDate = new Map(blockTuple);
  return { data: mapDate, timestamp };
};

export default { getLatestBlock };
