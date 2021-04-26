import * as React from 'react';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

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
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;

    return fetchMovementsData
      .fetchData({ params: { offset, limit, sortBy, sortDirection } })
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
    handleFetchMovements(
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  }, []);

  return (
    <>
      <Header title="Movement" />
      <Grid item>
        <InfinityTable
          sortBy={fetchParams.current.sortBy}
          sortDirection={fetchParams.current.sortDirection}
          rows={movementList}
          columns={columns}
          title="Movement Transactions"
          onBottomReach={handleFetchMoreMovements}
          onHeaderClick={handleSort}
        />
      </Grid>
    </>
  );
};

export default Movement;
