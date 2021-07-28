import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { format, fromUnixTime } from 'date-fns';

import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Header from '@components/Header/Header';
// import LineChart from '@components/Charts/LineChart/LineChart';
import { EChartsLineChart } from '@pages/HistoricalStatistics/Chart/EChartsLineChart';
import { BlockUnconfirmed } from '@utils/types/ITransactions';

import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IBlock } from '@utils/types/IBlocks';
import { useBackgroundChart } from '@utils/hooks';

import { info } from '@utils/constants/statistics';
import { SocketContext } from '@context/socket';

import * as Styles from './BlockStatistics.styles';

import BlockVisualization from './BlockVisualization/BlockVisualization';
import {
  transformBlocksData,
  ITransformBlocksData,
  // generateBlocksChartData,
} from './BlockStatistics.helpers';

const BLOCK_ELEMENTS_COUNT = 8;

interface ChartProps {
  labels: Array<string>;
  data: Array<number>;
}

const StatisticsBlocks: React.FC = () => {
  const history = useHistory();
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
  }, []);
  React.useEffect(() => {
    handleBlocksData();
  }, []);

  return (
    <>
      <Header title="Blocks Statistics" />
      <Grid container spacing={6}>
        {blockElements && blockElements.length ? (
          <Grid item xs={12}>
            <Styles.BlocksContainer container justify="flex-start" alignItems="center" spacing={8}>
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
            </Styles.BlocksContainer>
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
