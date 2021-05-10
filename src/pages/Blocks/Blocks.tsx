import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { IBlock } from '@utils/types/IBlocks';

import { TIMESTAMP_BLOCKS_KEY, columns, BLOCK_ID_KEY } from './Blocks.columns';
import {
  transformBlocksData,
  transformTableData,
  TransformBlocksData,
  DATA_FETCH_LIMIT,
  DATA_OFFSET,
  DATA_DEFAULT_SORT,
} from './Blocks.helpers';
import BlockVisualization from './BlockVisualization/BlockVisualization';
import * as Styles from './Blocks.styles';

interface IBlocksDataRef {
  offset: number;
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const Blocks = () => {
  const history = useHistory();
  const fetchParams = React.useRef<IBlocksDataRef>({
    offset: DATA_OFFSET,
    sortBy: TIMESTAMP_BLOCKS_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const [blockList, setBlocksList] = React.useState<Array<RowsProps>>([]);
  const [blockElements, setBlockElements] = React.useState<Array<TransformBlocksData>>([]);
  const fetchBlocksData = useFetch<{ data: Array<IBlock> }>({
    method: 'get',
    url: URLS.BLOCK_URL,
  });

  const handleFetchBlocks = (
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
    replaceData = false,
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;

    // Allow to sort by block height
    // In this situation if user will click on block column we need to sort by timestamp
    const fetchSortBy =
      fetchParams.current.sortBy === BLOCK_ID_KEY ? 'id' : fetchParams.current.sortBy;

    return fetchBlocksData
      .fetchData({ params: { offset, limit, sortBy: fetchSortBy, sortDirection } })
      .then(response => {
        if (response) {
          offset === 0 && setBlockElements(transformBlocksData(response.data));
          return transformTableData(response.data);
        }
        return [];
      })
      .then(data =>
        replaceData ? setBlocksList(data) : setBlocksList(prevState => [...prevState, ...data]),
      );
  };

  const handleFetchMoreBlocks = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    fetchParams.current.offset += DATA_FETCH_LIMIT;

    return handleFetchBlocks(
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortDirection = sortDirection;

    return handleFetchBlocks(DATA_OFFSET, sortBy, fetchParams.current.sortDirection, true);
  };

  React.useEffect(() => {
    handleFetchBlocks(DATA_OFFSET, fetchParams.current.sortBy, fetchParams.current.sortDirection);
  }, []);

  return (
    <>
      <Header title="Blocks" />
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
      <Styles.TableContainer item>
        <InfinityTable
          sortBy={fetchParams.current.sortBy}
          sortDirection={fetchParams.current.sortDirection}
          rows={blockList}
          title="Blocks List"
          columns={columns}
          tableHeight={950}
          onBottomReach={handleFetchMoreBlocks}
          onHeaderClick={handleSort}
        />
      </Styles.TableContainer>
    </>
  );
};

export default Blocks;
