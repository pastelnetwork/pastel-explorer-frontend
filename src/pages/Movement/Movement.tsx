import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { defaultFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useMovement from '@hooks/useMovement';

import * as Styles from './Movement.styles';

import { TIMESTAMP_MOVEMENT_KEY, columns } from './Movement.columns';
import {
  transformMovementData,
  DATA_FETCH_LIMIT,
  DATA_OFFSET,
  DATA_DEFAULT_SORT,
} from './Movement.helpers';

interface IMovementDataRef {
  offset: number;
  sortBy: string;
  sortDirection: SortDirectionsType;
  period: string;
}

const Movement: React.FC = () => {
  const fetchParams = useRef<IMovementDataRef>({
    offset: 0,
    sortBy: TIMESTAMP_MOVEMENT_KEY,
    sortDirection: DATA_DEFAULT_SORT,
    period: 'all',
  });
  const [apiParams, setParams] = useState<IMovementDataRef>({
    offset: 0,
    sortBy: TIMESTAMP_MOVEMENT_KEY,
    sortDirection: DATA_DEFAULT_SORT,
    period: 'all',
  });
  const { swrData, isLoading } = useMovement(
    apiParams.offset,
    DATA_FETCH_LIMIT * 2,
    apiParams.sortBy,
    apiParams.sortDirection,
    apiParams.period,
  );
  const filter = useSelector(getFilterState);
  const [isMobile, setMobileView] = useState(false);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [size, setSize] = useState<number>(1);
  const [movementList, setMovementList] = useState<Array<RowsProps>>([]);

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

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    fetchParams.current.offset += DATA_FETCH_LIMIT;

    setParams({ ...apiParams, offset: apiParams.offset + DATA_FETCH_LIMIT });
    setSize(size + 1);

    return true;
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortDirection = sortDirection;
    setSize(1);
    setParams({ ...apiParams, sortBy, offset: DATA_OFFSET, sortDirection });
  };

  useEffect(() => {
    if (filter.dateRange) {
      setSize(1);
      setParams({ ...apiParams, offset: 0, period: filter.dateRange });
    }
  }, [filter.dateRange]);

  useEffect(() => {
    if (!isLoading && swrData) {
      setTotalItem(swrData?.total);
      const newTransferData = swrData?.data ? transformMovementData(swrData.data) : [];
      if (size > 1) {
        setMovementList(prevState => [...prevState, ...newTransferData]);
      } else {
        setMovementList(newTransferData);
      }
    }
  }, [isLoading]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>Transactions List</Styles.Title>{' '}
      {totalItem > 0 ? (
        <Styles.SubTitle>(Total {formatNumber(totalItem)} txs)</Styles.SubTitle>
      ) : null}
    </Styles.TitleWrapper>
  );
  return (
    <Styles.GridWrapper item>
      <InfinityTable
        sortBy={apiParams.sortBy}
        sortDirection={apiParams.sortDirection}
        rows={movementList}
        columns={columns}
        tableHeight={950}
        title={getMovementTransactionsTitle()}
        filters={defaultFilters}
        onBottomReach={handleFetchMoreMovements}
        onHeaderClick={handleSort}
        className="movement-table"
        headerBackground
        rowHeight={isMobile ? 180 : 45}
      />
    </Styles.GridWrapper>
  );
};

export default Movement;
