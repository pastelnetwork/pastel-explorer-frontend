import * as React from 'react';
import { useSelector } from 'react-redux';

import Header from '@components/Header/Header';
import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IBlock } from '@utils/types/IBlocks';
import { blocksFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';

import { TIMESTAMP_BLOCKS_KEY, columns, BLOCK_ID_KEY } from './Blocks.columns';
import {
  transformTableData,
  DATA_FETCH_LIMIT,
  DATA_OFFSET,
  DATA_DEFAULT_SORT,
} from './Blocks.helpers';
import * as Styles from './Blocks.styles';

interface IBlocksDataRef {
  offset: number;
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const Blocks = () => {
  const fetchParams = React.useRef<IBlocksDataRef>({
    offset: DATA_OFFSET,
    sortBy: TIMESTAMP_BLOCKS_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const [blockList, setBlocksList] = React.useState<Array<RowsProps>>([]);
  const filter = useSelector(getFilterState);
  const fetchBlocksData = useFetch<{ data: Array<IBlock> }>({
    method: 'get',
    url: URLS.BLOCK_URL,
  });

  const handleFetchBlocks = (
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
    replaceData = false,
    filterBy = 'period',
    filterValue = filter.dateRange || '',
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;

    // Allow to sort by block height
    // In this situation if user will click on block column we need to sort by timestamp
    const fetchSortBy =
      fetchParams.current.sortBy === BLOCK_ID_KEY ? 'id' : fetchParams.current.sortBy;
    const params: Record<string, string | number> = {
      offset,
      limit,
      sortBy: fetchSortBy,
      sortDirection,
      period: blocksFilters[blocksFilters.length - 1].value,
    };
    if (filterValue && filterValue !== blocksFilters[blocksFilters.length - 1].value) {
      params[filterBy] = filterValue;
    }
    return fetchBlocksData
      .fetchData({ params })
      .then(response => {
        if (response) {
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

  const handleSort = ({ sortBy, sortDirection, filterBy, filterValue }: ISortData) => {
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortDirection = sortDirection;

    return handleFetchBlocks(
      DATA_OFFSET,
      sortBy,
      fetchParams.current.sortDirection,
      true,
      filterBy,
      filterValue,
    );
  };

  React.useEffect(() => {
    if (filter.dateRange) {
      fetchParams.current.offset = DATA_OFFSET;
      handleFetchBlocks(
        DATA_OFFSET,
        fetchParams.current.sortBy,
        fetchParams.current.sortDirection,
        true,
        'period',
        filter.dateRange,
      );
    } else {
      handleFetchBlocks(DATA_OFFSET, fetchParams.current.sortBy, fetchParams.current.sortDirection);
    }
  }, [filter.dateRange]);

  return (
    <>
      <Header title="Block List" />
      <Styles.TableContainer item>
        <InfinityTable
          sortBy={fetchParams.current.sortBy}
          sortDirection={fetchParams.current.sortDirection}
          rows={blockList}
          filters={blocksFilters}
          title="   "
          columns={columns}
          tableHeight={650}
          onBottomReach={handleFetchMoreBlocks}
          onHeaderClick={handleSort}
          className="block-list-table"
        />
      </Styles.TableContainer>
    </>
  );
};

export default Blocks;
