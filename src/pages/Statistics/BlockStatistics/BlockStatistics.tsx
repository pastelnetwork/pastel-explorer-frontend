import * as React from 'react';
// third party
import { useHistory } from 'react-router-dom';
import { format, fromUnixTime } from 'date-fns';

import { Grid, darken } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { TAppTheme } from '@theme/index';
// application
import Header from '@components/Header/Header';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { BlockUnconfirmed } from '@utils/types/ITransactions';

import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { useFetch, useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { IBlock } from '@utils/types/IBlocks';
import { useBackgroundChart } from '@utils/hooks';
import { PeriodTypes } from '@utils/helpers/statisticsLib';

import { periods, info } from '@utils/constants/statistics';
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
    marginBottom: 16,
    '&::-webkit-scrollbar': {
      background: _theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
      background: darken(_theme.palette.background.paper, 0.5),
    },
  },
}));

interface ChartProps {
  labels: Array<string>;
  data: Array<number>;
}

const StatisticsBlocks: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [blockElements, setBlockElements] = React.useState<Array<ITransformBlocksData>>([]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [blocksUnconfirmed, setBlocksUnconfirmed] = React.useState<BlockUnconfirmed[] | null>(null);
  const [period, setPeriod] = React.useState(periods[5][0]);
  const fetchUnconfirmedTxs = useFetch<{ data: BlockUnconfirmed[] }>({
    method: 'get',
    url: URLS.GET_UNCONFIRMED_TRANSACTIONS,
  });
  const socket = React.useContext(SocketContext);

  const fetchBlocksData = useFetch<{ data: Array<IBlock>; timestamp: number }>({
    method: 'get',
    url: URLS.BLOCK_URL,
  });

  const generateChartData = (blocks: Array<IBlock>) => {
    const groupedBlocks = blocks.reduce(
      (acc: ChartProps, { size, timestamp }) => {
        const time = format(fromUnixTime(timestamp), 'HH:mm');

        acc.labels.push(time);
        acc.data.push(size / 1024);

        return acc;
      },
      { labels: [], data: [] },
    );

    return groupedBlocks;
  };

  const { isLoading, data: chartData } = useDeferredData<{ data: Array<IBlock> }, ChartProps>(
    { method: 'get', url: `${URLS.BLOCK_URL}?period=${period}` },
    ({ data }) => generateChartData(data),
    undefined,
    undefined,
    [period, blockElements],
  );

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

  const handlePeriodFilterChange = (value: PeriodTypes) => {
    setPeriod(value);
  };

  return (
    <>
      <Header title="Current Statistics" />
      <Styles.BlockWrapper>
        <Styles.BlockTitle>Blocks Statistics</Styles.BlockTitle>
        <Grid classes={{ root: classes.wrapper }} container>
          {blockElements && blockElements.length ? (
            <Grid
              classes={{ container: classes.root }}
              className={classes.root}
              wrap="nowrap"
              container
              justify="flex-start"
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
            </Grid>
          ) : (
            <Skeleton animation="wave" variant="rect" height={300} />
          )}
          <Grid item xs={12} lg={12}>
            {chartData || !isLoading ? (
              <div style={{ flex: 1, backgroundColor: currentBgColor }}>
                <EChartsLineChart
                  chartName="hashrate"
                  dataX={chartData?.labels}
                  dataY={chartData?.data}
                  title="Block sizes (kB)"
                  info={info}
                  offset={1}
                  handleBgColorChange={handleBgColorChange}
                  period={period}
                  periods={periods[5]}
                  handlePeriodFilterChange={handlePeriodFilterChange}
                />
              </div>
            ) : (
              <Skeleton animation="wave" variant="rect" height={300} />
            )}
          </Grid>
        </Grid>
      </Styles.BlockWrapper>
    </>
  );
};

export default StatisticsBlocks;
