import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { blocksPeriodFilters, blocksFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useBlocks from '@hooks/useBlocks';

import { columns, BLOCK_ID_KEY } from './Blocks.columns';
import { transformTableData, DATA_DEFAULT_SORT, DATA_FETCH_LIMIT } from './Blocks.helpers';
import * as Styles from './Blocks.styles';

interface IBlocksDataRef {
  sortBy: string;
  sortDirection: SortDirectionsType;
  period: string;
  types: string[];
}

const Blocks = () => {
  const filter = useSelector(getFilterState);
  const [apiParams, setParams] = useState<IBlocksDataRef>({
    sortBy: 'id',
    sortDirection: DATA_DEFAULT_SORT,
    period: filter.dateRange || 'all',
    types: filter.dropdownType || [],
  });
  const { swrData, total, swrSize, swrSetSize, isLoading } = useBlocks(
    DATA_FETCH_LIMIT,
    apiParams.sortBy === BLOCK_ID_KEY ? 'id' : apiParams.sortBy,
    apiParams.sortDirection,
    apiParams.period,
    apiParams.types,
  );
  const [isMobile, setMobileView] = useState(false);

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
    swrSetSize(swrSize + 1);
    setParams({ ...apiParams });
    return true;
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    swrSetSize(1);
    setParams({
      ...apiParams,
      sortBy: sortBy === 'blockHash' ? 'id' : sortBy,
      sortDirection,
    });
  };

  useEffect(() => {
    if (filter.dateRange || filter.dropdownType) {
      swrSetSize(1);
      setParams({
        ...apiParams,
        period: filter.dateRange || apiParams.period || '',
        types: filter.dropdownType || apiParams.types || '',
      });
    }
  }, [filter.dateRange, filter.dropdownType]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>Block List</Styles.Title>{' '}
      {total > 0 ? <Styles.SubTitle>(Total {formatNumber(total)} blocks)</Styles.SubTitle> : null}
    </Styles.TitleWrapper>
  );

  return (
    <Styles.TableContainer item>
      <InfinityTable
        sortBy={apiParams.sortBy}
        sortDirection={apiParams.sortDirection}
        rows={swrData ? transformTableData(swrData, isMobile) : []}
        filters={blocksPeriodFilters}
        dropdownFilters={blocksFilters}
        dropdownLabel="Ticket type:"
        title={getMovementTransactionsTitle()}
        columns={columns}
        tableHeight={isMobile ? 750 : 650}
        onBottomReach={handleFetchMoreBlocks}
        onHeaderClick={handleSort}
        className="block-list-table"
        headerBackground
        rowHeight={isMobile ? 180 : 45}
        customLoading={isLoading}
      />
    </Styles.TableContainer>
  );
};

export default Blocks;
