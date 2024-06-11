import { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import * as StatisticsStyles from '@pages/Statistics/Statistics.styles';
import { useMempool } from '@hooks/useBlocks';
import { SocketContext } from '@context/socket';

import { mempoolColumns } from './Blocks.columns';
import { transformMempoolTableData } from './Blocks.helpers';
import * as Styles from './Blocks.styles';

const DATA_FETCH_LIMIT = 10;

export default function MempoolTable() {
  const socket = useContext(SocketContext);
  const [isMobile, setMobileView] = useState(false);
  const { swrData, swrSize, swrSetSize, isLoading } = useMempool(DATA_FETCH_LIMIT);

  const handleResize = () => {
    setMobileView(false);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    socket.on('getUpdateBlock', () => {
      swrSetSize(1);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      socket.off('getUpdateBlock');
    };
  }, []);

  const handleFetchMoreBlocks = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    swrSetSize(swrSize + 1);
    return true;
  };

  if (!swrData?.length || isLoading) {
    return null;
  }

  const getRowHeight = () => {
    return !isMobile ? 45 : 180;
  };

  const getTableHeight = () => {
    if (!swrData?.length && !isLoading) {
      return 150;
    }
    const height = getRowHeight() * (swrData?.length || 0) + getRowHeight();
    return height > 550 ? 550 : height;
  };

  return (
    <Styles.MempoolTableWrapper>
      <StatisticsStyles.BlockWrapper>
        <StatisticsStyles.BlockTitle>
          {parse(translate('pages.movement.mempool'))}
        </StatisticsStyles.BlockTitle>
        <div>
          <InfinityTable
            rows={transformMempoolTableData(swrData)}
            columns={mempoolColumns}
            tableHeight={getTableHeight()}
            onBottomReach={handleFetchMoreBlocks}
            className="mempool-list-table"
            headerBackground
            rowHeight={getRowHeight()}
            customLoading={isLoading}
          />
        </div>
      </StatisticsStyles.BlockWrapper>
    </Styles.MempoolTableWrapper>
  );
}
