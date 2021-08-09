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
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IBlock } from '@utils/types/IBlocks';
import { useBackgroundChart } from '@utils/hooks';

import { info } from '@utils/constants/statistics';
import { SocketContext } from '@context/socket';

import BlockVisualization from './BlockVisualization/BlockVisualization';
import { transformBlocksData, ITransformBlocksData } from './BlockStatistics.helpers';

const BLOCK_ELEMENTS_COUNT = 8;

const useStyles = makeStyles((_theme: TAppTheme) => ({
  wrapper: {
    margin: 0,
    [_theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 314px)',
    },
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
  const [chartData, setChartData] = React.useState<ChartProps | null>(null);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
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
  const handleBlocksData = () => {
    Promise.all([
      fetchBlocksData.fetchData({ params: { limit: BLOCK_ELEMENTS_COUNT } }),
      fetchUnconfirmedTxs.fetchData(),
    ]).then(([blocksData, txs]) => {
      if (blocksData) {
        setChartData(generateChartData(blocksData.data));
        setBlockElements(transformBlocksData(blocksData.data, blocksData.timestamp));
      }
      setBlocksUnconfirmed(txs?.data || null);
    });
  };
  React.useEffect(() => {
    socket.on('getUpdateBlock', () => {
      handleBlocksData();
    });
    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);
  React.useEffect(() => {
    handleBlocksData();
  }, []);

  return (
    <>
      <Header title="Blocks Statistics" />
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
            {blocksUnconfirmed && blocksUnconfirmed.length
              ? blocksUnconfirmed.map(({ height, size, txsCount }, idx) => (
                  <Grid item key={height}>
                    <BlockVisualization
                      height="--"
                      className="block-unconfirmed"
                      size={`${(size / 1024).toFixed(2)} kB`}
                      transactionCount={`${txsCount} transactions`}
                      minutesAgo={`In ~${(blocksUnconfirmed.length - idx) * 10} minutes`}
                    />
                  </Grid>
                ))
              : null}
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
            {blockElements.slice(1, 8).map(({ id, height, size, transactionCount, minutesAgo }) => (
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
          {chartData && (
            <div style={{ flex: 1, backgroundColor: currentBgColor }}>
              <EChartsLineChart
                chartName="hashrate"
                dataX={chartData?.labels}
                dataY={chartData?.data}
                title="Block sizes (kB)"
                info={info}
                offset={1}
                handleBgColorChange={handleBgColorChange}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticsBlocks;
