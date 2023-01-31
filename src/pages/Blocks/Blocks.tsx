import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import { blocksPeriodFilters, blocksFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useBlocks from '@hooks/useBlocks';

import { columns, BLOCK_ID_KEY } from './Blocks.columns';
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
  period: string;
  types: string[];
}

const Blocks = () => {
  const filter = useSelector(getFilterState);
  const [apiParams, setParams] = useState<IBlocksDataRef>({
    offset: 0,
    sortBy: 'id',
    sortDirection: DATA_DEFAULT_SORT,
    period: filter.dateRange || 'all',
    types: filter.dropdownType || [],
  });
  const { swrData, isLoading } = useBlocks(
    apiParams.offset,
    DATA_FETCH_LIMIT * 2,
    apiParams.sortBy === BLOCK_ID_KEY ? 'id' : apiParams.sortBy,
    apiParams.sortDirection,
    apiParams.period,
    apiParams.types,
  );
  const [size, setSize] = useState<number>(1);
  const [isMobile, setMobileView] = useState(false);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [blockList, setBlocksList] = useState<Array<RowsProps>>([]);

  const handleShowSubMenu = () => {
    setMobileView(false);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const handleFetchMoreBlocks = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    setParams({ ...apiParams, offset: apiParams.offset + DATA_FETCH_LIMIT });
    return true;
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    setSize(1);
    setParams({
      ...apiParams,
      sortBy: sortBy === 'blockHash' ? 'id' : sortBy,
      offset: DATA_OFFSET,
      sortDirection,
    });
  };

  useEffect(() => {
    if (filter.dateRange || filter.dropdownType) {
      setSize(1);
      setParams({
        ...apiParams,
        offset: 0,
        period: filter.dateRange || '',
        types: filter.dropdownType || '',
      });
    }
  }, [filter.dateRange, filter.dropdownType]);

  useEffect(() => {
    if (!isLoading && swrData) {
      setTotalItem(swrData?.total);
      const newTransferData = swrData?.data ? transformTableData(swrData.data, isMobile) : [];
      if (size > 1) {
        setBlocksList(prevState => [...prevState, ...newTransferData]);
      } else {
        setBlocksList(newTransferData);
      }
    }
  }, [isLoading, size, apiParams]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>Block List</Styles.Title>{' '}
      {totalItem > 0 ? (
        <Styles.SubTitle>(Total {formatNumber(totalItem)} blocks)</Styles.SubTitle>
      ) : null}
    </Styles.TitleWrapper>
  );

  return (
    <Styles.TableContainer item>
      <InfinityTable
        sortBy={apiParams.sortBy}
        sortDirection={apiParams.sortDirection}
        rows={blockList}
        filters={blocksPeriodFilters}
        dropdownFilters={blocksFilters}
        dropdownLabel="Type"
        title={getMovementTransactionsTitle()}
        columns={columns}
        tableHeight={isMobile ? 750 : 650}
        onBottomReach={handleFetchMoreBlocks}
        onHeaderClick={handleSort}
        className="block-list-table"
        headerBackground
        rowHeight={isMobile ? 180 : 45}
      />
    </Styles.TableContainer>
  );
};

export default Blocks;
