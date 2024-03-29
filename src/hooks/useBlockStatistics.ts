import { useEffect, useState, useContext } from 'react';

import { SocketContext } from '@context/socket';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IBlock } from '@utils/types/IBlocks';
import {
  transformBlocksData,
  ITransformBlocksData,
} from '@pages/Statistics/BlockStatistics/BlockStatistics.helpers';
import { BlockUnconfirmed } from '@utils/types/ITransactions';

const BLOCK_ELEMENTS_COUNT = 8;

export default function useBlockStatistics() {
  const socket = useContext(SocketContext);
  const [blockElements, setBlockElements] = useState<Array<ITransformBlocksData>>([]);
  const [blocksUnconfirmed, setBlocksUnconfirmed] = useState<BlockUnconfirmed[] | null>(null);
  const fetchUnconfirmedTxs = useFetch<{ data: BlockUnconfirmed[] }>({
    method: 'get',
    url: URLS.GET_UNCONFIRMED_TRANSACTIONS,
  });
  const fetchBlocksData = useFetch<{ data: Array<IBlock>; timestamp: number }>({
    method: 'get',
    url: URLS.STATISTICS_BLOCK_URL,
  });

  const handleBlocksData = () => {
    Promise.all([
      fetchBlocksData.fetchData({ params: { limit: BLOCK_ELEMENTS_COUNT } }),
      fetchUnconfirmedTxs.fetchData(),
    ]).then(([blocksData, txs]) => {
      if (blocksData) {
        setBlockElements(transformBlocksData(blocksData.data, blocksData.timestamp));
      }
      setBlocksUnconfirmed(txs?.data || null);
    });
  };

  useEffect(() => {
    handleBlocksData();

    socket.on('getUpdateBlock', () => {
      handleBlocksData();
    });

    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);

  return {
    blockElements,
    blocksUnconfirmed,
  };
}
