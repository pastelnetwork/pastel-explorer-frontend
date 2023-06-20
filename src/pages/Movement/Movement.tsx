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
import { translate } from '@utils/helpers/i18n';
import { getSubHours } from '@utils/helpers/date/date';

import * as Styles from './Movement.styles';

import { TIMESTAMP_MOVEMENT_KEY, columns } from './Movement.columns';
import { transformMovementData, DATA_FETCH_LIMIT, DATA_DEFAULT_SORT } from './Movement.helpers';

interface IMovementDataRef {
  sortBy: string;
  sortDirection: SortDirectionsType;
  period: string;
  customDateRange: {
    startDate: number;
    endDate: number | null;
  };
}

const Movement: React.FC = () => {
  const filter = useSelector(getFilterState);
  const [apiParams, setParams] = useState<IMovementDataRef>({
    sortBy: TIMESTAMP_MOVEMENT_KEY,
    sortDirection: DATA_DEFAULT_SORT,
    period: filter.dateRange || 'all',
    customDateRange: {
      startDate: 0,
      endDate: null,
    },
  });
  const { swrData, total, swrSize, swrSetSize, isLoading } = useMovement(
    DATA_FETCH_LIMIT,
    apiParams.sortBy,
    apiParams.sortDirection,
    apiParams.period,
    apiParams.customDateRange,
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
    if (filter.dateRange || filter.customDateRange) {
      swrSetSize(1);
      let customDateRange = filter.customDateRange || { startDate: 0, endDate: null };
      if (!filter.customDateRange?.startDate && filter.dateRange !== 'all') {
        customDateRange = { startDate: getSubHours(filter.dateRange), endDate: Date.now() };
      } else {
        customDateRange = { startDate: 0, endDate: null };
      }
      setParams({
        ...apiParams,
        period: filter.dateRange || 'all',
        customDateRange,
      });
    }
  }, [filter.dateRange, filter.customDateRange]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>{translate('pages.movement.transactionsList')}</Styles.Title>{' '}
      {total > 0 ? (
        <Styles.SubTitle>
          ({translate('pages.movement.transactionsList', { total: formatNumber(total) })})
        </Styles.SubTitle>
      ) : null}
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
        showDateTimePicker
        dateRange={filter.customDateRange}
      />
    </Styles.GridWrapper>
  );
};

export default Movement;
