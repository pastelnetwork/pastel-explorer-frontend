import * as React from 'react';
import { useSelector } from 'react-redux';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { defaultFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ITransaction } from '@utils/types/ITransactions';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
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
}

const Movement: React.FC = () => {
  const fetchParams = React.useRef<IMovementDataRef>({
    offset: DATA_OFFSET,
    sortBy: TIMESTAMP_MOVEMENT_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const filter = useSelector(getFilterState);

  const [isMobile, setMobileView] = React.useState(false);
  const [totalItem, setTotalItem] = React.useState<number>(0);
  const [movementList, setMovementList] = React.useState<Array<RowsProps>>([]);
  const fetchMovementsData = useFetch<{ data: Array<ITransaction>; total: number }>({
    method: 'get',
    url: URLS.TRANSACTION_URL,
  });

  const handleShowSubMenu = () => {
    setMobileView(false);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  React.useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const handleFetchMovements = async (
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
    replaceData = false,
    filterBy = 'period',
    filterValue = filter.dateRange || '',
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;
    const params: Record<string, string | number> = {
      offset,
      limit,
      sortBy,
      sortDirection,
      period: '1d',
    };
    if (filterValue && filterValue !== '1d') {
      params[filterBy] = filterValue;
    }
    return fetchMovementsData
      .fetchData({ params })
      .then(response => {
        if (response) {
          setTotalItem(response?.total);
        }
        return response ? transformMovementData(response.data) : [];
      })
      .then(data =>
        replaceData ? setMovementList(data) : setMovementList(prevState => [...prevState, ...data]),
      );
  };

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    fetchParams.current.offset += DATA_FETCH_LIMIT;

    return handleFetchMovements(
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.offset = DATA_OFFSET;
    fetchParams.current.sortDirection = sortDirection;

    return handleFetchMovements(
      fetchParams.current.offset,
      sortBy,
      fetchParams.current.sortDirection,
      true,
    );
  };

  React.useEffect(() => {
    if (filter.dateRange) {
      handleFetchMovements(
        0,
        fetchParams.current.sortBy,
        fetchParams.current.sortDirection,
        true,
        'period',
        filter.dateRange,
      );
    } else {
      handleFetchMovements(
        fetchParams.current.offset,
        fetchParams.current.sortBy,
        fetchParams.current.sortDirection,
      );
    }
  }, [filter.dateRange]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>Movement Transactions</Styles.Title>{' '}
      {totalItem > 0 ? (
        <Styles.SubTitle>(Total {formatNumber(totalItem)} txs)</Styles.SubTitle>
      ) : null}
    </Styles.TitleWrapper>
  );

  return (
    <Styles.GridWrapper item>
      <InfinityTable
        sortBy={fetchParams.current.sortBy}
        sortDirection={fetchParams.current.sortDirection}
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
