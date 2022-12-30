import * as React from 'react';
// third party
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { Grid, darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TAppTheme } from '@theme/index';
// application
import { BlockUnconfirmed } from '@utils/types/ITransactions';

import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IBlock } from '@utils/types/IBlocks';

import { SocketContext } from '@context/socket';

import BlockVisualization from './BlockVisualization/BlockVisualization';
import { transformBlocksData, ITransformBlocksData } from './BlockStatistics.helpers';

import * as Styles from '../Statistics.styles';

const BLOCK_ELEMENTS_COUNT = 8;

const useStyles = makeStyles((_theme: TAppTheme) => ({
  wrapper: {
    margin: 0,
  },
  root: {
    padding: '25px 20px',
    overflowX: 'auto',
    width: '100%',
    margin: 0,
    marginBottom: 0,
    '&::-webkit-scrollbar': {
      background: _theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
      background: darken(_theme.palette.background.paper, 0.5),
    },
  },
}));

const StatisticsBlocks: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [blockElements, setBlockElements] = React.useState<Array<ITransformBlocksData>>([]);
  const [blocksUnconfirmed, setBlocksUnconfirmed] = React.useState<BlockUnconfirmed[] | null>(null);
  const fetchUnconfirmedTxs = useFetch<{ data: BlockUnconfirmed[] }>({
    method: 'get',
    url: URLS.GET_UNCONFIRMED_TRANSACTIONS,
  });
  const socket = React.useContext(SocketContext);

  const fetchBlocksData = useFetch<{ data: Array<IBlock>; timestamp: number }>({
    method: 'get',
    url: URLS.BLOCK_URL,
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

  React.useEffect(() => {
    handleBlocksData();

    socket.on('getUpdateBlock', () => {
      handleBlocksData();
    });

    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);

  const renderMempoolBlock = () => {
    if (blocksUnconfirmed?.length) {
      const size = blocksUnconfirmed.reduce((a, b) => {
        return a + b.size;
      }, 0);
      const txsCount = blocksUnconfirmed.reduce((a, b) => {
        return a + b.txsCount;
      }, 0);

      return (
        <Grid item>
          <BlockVisualization
            title="Mempool:"
            height={<span style={{ fontSize: 14 }}>Pending Block</span>}
            className="block-unconfirmed"
            size={`${(size / 1024).toFixed(2)} kB`}
            transactionCount={`${txsCount} ${txsCount > 1 ? 'transactions' : 'transaction'}`}
            minutesAgo={`In ~${blocksUnconfirmed.length * 10} minutes`}
          />
        </Grid>
      );
    }

    return null;
  };

  return (
    <>
      <Styles.BlockWrapper>
        <Styles.BlockTitle>Blocks Statistics</Styles.BlockTitle>
        <Styles.GridStyle classes={{ root: classes.wrapper }} container>
          {blockElements?.length ? (
            <Styles.GridBlocksStatisticsRoot
              wrap="nowrap"
              container
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              {renderMempoolBlock()}
              <Grid item>
                <div
                  style={{
                    width: 3,
                    height: 145,
                    borderLeft: '3px dashed',
                    marginLeft: -10,
                    marginTop: -30,
                  }}
                />
              </Grid>
              {blockElements
                .slice(1, 8)
                .map(({ id, height, size, transactionCount, minutesAgo }) => (
                  <Grid item key={id}>
                    <BlockVisualization
                      clickHandler={() => history.push(`${ROUTES.BLOCK_DETAILS}/${id}`)}
                      height={height}
                      size={size}
                      transactionCount={transactionCount}
                      minutesAgo={minutesAgo}
                    />
                  </Grid>
                ))}
            </Styles.GridBlocksStatisticsRoot>
          ) : (
            <Styles.ChartSection>
              <>
                <Skeleton animation="wave" variant="rect" height={207} />
                <Styles.LoadingText>Loading data...</Styles.LoadingText>
              </>
            </Styles.ChartSection>
          )}
        </Styles.GridStyle>
      </Styles.BlockWrapper>
    </>
  );
};

export default StatisticsBlocks;
