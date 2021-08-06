import * as React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Header from '@components/Header/Header';
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

  const [movementList, setMovementList] = React.useState<Array<RowsProps>>([]);
  const fetchMovementsData = useFetch<{ data: Array<ITransaction> }>({
    method: 'get',
    url: URLS.TRANSACTION_URL,
  });

  const handleFetchMovements = (
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
      .then(response => (response ? transformMovementData(response.data) : []))
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

  return (
    <>
      <Header title="Movement Transactions" />
      <Grid item>
        <InfinityTable
          sortBy={fetchParams.current.sortBy}
          sortDirection={fetchParams.current.sortDirection}
          rows={movementList}
          columns={columns}
          tableHeight={950}
          title="   "
          filters={defaultFilters}
          onBottomReach={handleFetchMoreMovements}
          onHeaderClick={handleSort}
        />
      </Grid>
    </>
  );
};

export default Movement;
