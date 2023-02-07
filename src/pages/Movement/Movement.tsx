import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { defaultFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useMovement from '@hooks/useMovement';

import * as Styles from './Movement.styles';

import { TIMESTAMP_MOVEMENT_KEY, columns } from './Movement.columns';
import { transformMovementData, DATA_FETCH_LIMIT, DATA_DEFAULT_SORT } from './Movement.helpers';

interface IMovementDataRef {
  sortBy: string;
  sortDirection: SortDirectionsType;
  period: string;
}

const Movement: React.FC = () => {
  const filter = useSelector(getFilterState);
  const [apiParams, setParams] = useState<IMovementDataRef>({
    sortBy: TIMESTAMP_MOVEMENT_KEY,
    sortDirection: DATA_DEFAULT_SORT,
    period: filter.dateRange || 'all',
  });
  const { swrData, total, swrSize, swrSetSize, isLoading } = useMovement(
    DATA_FETCH_LIMIT,
    apiParams.sortBy,
    apiParams.sortDirection,
    apiParams.period,
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

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    swrSetSize(swrSize + 1);
    setParams({ ...apiParams });
    return true;
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    swrSetSize(1);
    setParams({ ...apiParams, sortBy, sortDirection });
  };

  useEffect(() => {
    if (filter.dateRange) {
      swrSetSize(1);
      setParams({ ...apiParams, period: filter.dateRange });
    }
  }, [filter.dateRange]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>Transactions List</Styles.Title>{' '}
      {total > 0 ? <Styles.SubTitle>(Total {formatNumber(total)} txs)</Styles.SubTitle> : null}
    </Styles.TitleWrapper>
  );

  return (
    <Styles.GridWrapper item>
      <InfinityTable
        sortBy={apiParams.sortBy}
        sortDirection={apiParams.sortDirection}
        rows={swrData ? transformMovementData(swrData) : []}
        columns={columns}
        tableHeight={950}
        title={getMovementTransactionsTitle()}
        filters={defaultFilters}
        onBottomReach={handleFetchMoreMovements}
        onHeaderClick={handleSort}
        className="movement-table"
        headerBackground
        rowHeight={isMobile ? 180 : 45}
        customLoading={isLoading}
      />
    </Styles.GridWrapper>
  );
};

export default Movement;
