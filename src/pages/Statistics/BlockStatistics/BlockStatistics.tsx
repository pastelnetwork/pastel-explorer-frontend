import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { format, fromUnixTime } from 'date-fns';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import LineChart from '@components/Charts/LineChart/LineChart';

import * as ROUTES from '@utils/constants/routes';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IBlock } from '@utils/types/IBlocks';

import * as Styles from './BlockStatistics.styles';
import BlockVisualization from './BlockVisualization/BlockVisualization';
import {
  transformBlocksData,
  ITransformBlocksData,
  generateBlocksChartData,
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
  const fetchBlocksData = useFetch<{ data: Array<IBlock> }>({
    method: 'get',
    url: URLS.BLOCK_URL,
  });

  const generateChartData = (blocks: Array<IBlock>) => {
    const groupedBlocks = blocks.reduce(
      (acc: ChartProps, { size, timestamp }) => {
        const time = format(fromUnixTime(timestamp), 'HH:mm');

        acc.labels.push(time);
        acc.data.push(size);

        return acc;
      },
      { labels: [], data: [] },
    );

    return groupedBlocks;
  };

  React.useEffect(() => {
    fetchBlocksData.fetchData({ params: { limit: BLOCK_ELEMENTS_COUNT } }).then(response => {
      if (response) {
        console.log(response);
        setChartData(generateChartData(response.data));
        setBlockElements(transformBlocksData(response.data));
      }
    });
  }, []);

  return (
    <>
      <Header title="Blocks Statistics" />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Styles.BlocksContainer container justify="space-around" alignItems="center" spacing={8}>
            {blockElements.map(({ id, height, size, transactionCount, minutesAgo }) => (
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
        <Grid item xs={12} lg={6}>
          {chartData && (
            <LineChart
              title="Block sizes"
              data={generateBlocksChartData(chartData.labels, chartData.data)}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticsBlocks;
