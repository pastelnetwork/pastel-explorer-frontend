import * as React from 'react';
import _debounce from 'lodash.debounce';
import {
  AutoSizer,
  Table,
  Column,
  TableCellProps,
  TableHeaderProps,
  ScrollEventData,
  Index,
  OverscanIndicesGetterParams,
} from 'react-virtualized';
import parse from 'html-react-parser';
import { CSSProperties } from '@mui/styles';
import { CircularProgress, darken } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

import { IFilterState } from '@redux/reducers/filterReducer';
import { useGetThemeMode } from '@redux/reducers/appThemeReducer';
import themeVariant from '@theme/variants';
import { TFilter } from '@utils/types/IFilter';
import { translate } from '@utils/helpers/i18n';
import { getCurrencyName } from '@utils/appInfo';
import Filters from './Filters';

import * as Styles from './InfinityTable.styles';

export type HeaderType = { id: number | string; header: string };

export type SortDirectionsType = 'ASC' | 'DESC';

export interface ISortData {
  sortBy: string;
  sortDirection: SortDirectionsType;
  filterBy?: string;
  filterValue?: string;
}

export interface RowsProps {
  [key: string]: number | string | JSX.Element;
}

interface IInfinityTableComponentProps {
  title?: React.ReactNode;
  customTitle?: React.ReactNode;
  columns: Array<{
    width: number;
    flexGrow: number;
    label: string;
    dataKey: string;
    dataTitle?: string;
    disableSort: boolean;
  }>;
  filters?: TFilter[];
  rows: Array<RowsProps>;
  sortBy?: string;
  sortDirection?: SortDirectionsType;
  rowHeight?: number;
  tableHeight?: number;
  loadMoreFrom?: number;
  disableLoading?: boolean;
  renderAllRows?: boolean;
  // eslint-disable-next-line
  onBottomReach?: (value: boolean) => void;
  // eslint-disable-next-line
  onHeaderClick?: (info: ISortData) => void;
  className?: string;
  headerBackground?: boolean;
  isLoading?: boolean;
  dropdownFilters?: TFilter[];
  dropdownLabel?: string;
  customLoading?: boolean;
  showDateTimePicker?: boolean;
  dateRange?: {
    startDate: number;
    endDate: number | null;
  };
  showLess?: boolean;
  customFilter?: React.ReactNode;
  onFilterChange?: (_params: IFilterState) => void;
}

type ITableCellRendererProps = TableCellProps & { dataTitle?: string };

const noRowsRenderer = () => <Styles.EmptyData />;
const headerRenderer = ({
  label,
  dataKey,
  sortBy,
  sortDirection,
  disableSort,
}: TableHeaderProps & { columnIndex: number }) => {
  const showSort = !disableSort && dataKey === sortBy;
  const renderSortIcon = () =>
    !disableSort && sortDirection === 'DESC' ? <ArrowDropDown /> : <ArrowDropUp />;

  return (
    <Styles.HeaderCell component="div" variant="head" $disabledSort={Boolean(disableSort)}>
      {parse(translate(label as string, { currency: getCurrencyName() }))}
      {showSort && renderSortIcon()}
    </Styles.HeaderCell>
  );
};
const TableCellRenderer = ({ cellData, dataTitle }: ITableCellRendererProps) => (
  <Styles.Cell
    component="div"
    data-title={
      dataTitle ? parse(translate(dataTitle, { currency: getCurrencyName() })) : undefined
    }
    className="cell-content"
  >
    {cellData}
  </Styles.Cell>
);

TableCellRenderer.defaultProps = {
  dataTitle: undefined,
};

const getOverscanIndices = ({ cellCount }: OverscanIndicesGetterParams) => ({
  overscanStartIndex: 0,
  overscanStopIndex: cellCount - 1,
});

const InfinityTableComponent: React.FC<IInfinityTableComponentProps> = ({
  title,
  rows,
  columns,
  sortBy,
  filters,
  dropdownFilters,
  dropdownLabel,
  sortDirection,
  loadMoreFrom = 0,
  onBottomReach,
  onHeaderClick,
  rowHeight = 45,
  tableHeight = 500,
  disableLoading,
  renderAllRows,
  className,
  headerBackground,
  isLoading,
  customTitle,
  customLoading,
  showDateTimePicker = false,
  dateRange,
  showLess = false,
  customFilter = null,
  onFilterChange = undefined,
}) => {
  const [loading, setLoading] = React.useState(false);
  const isDarkMode = useGetThemeMode();
  const [color, bgOpacity] = React.useMemo(
    () =>
      isDarkMode ? [themeVariant.custom.blue.blackRock, 0.5] : [themeVariant.custom.white, 0.05],
    [isDarkMode],
  );
  const handleReachBottom = _debounce(
    ({ clientHeight, scrollHeight, scrollTop }: ScrollEventData) => {
      if (!onBottomReach || rows.length < loadMoreFrom) return null;

      const bottomReached = clientHeight + scrollTop + 5 >= scrollHeight && scrollTop > 0;
      !loading && bottomReached && setLoading(true);
      return onBottomReach(bottomReached);
    },
    100,
  );

  const handleSort = (info: ISortData) => {
    !loading && !disableLoading && setLoading(true);

    return onHeaderClick && onHeaderClick(info);
  };

  const handleRowStyle = ({ index }: Index): CSSProperties => {
    if (index % 2 === 0) {
      return {
        backgroundColor: darken(color, bgOpacity),
      };
    }

    return {
      backgroundColor: color,
    };
  };

  React.useEffect(() => {
    loading && setLoading(false);
  }, [rows]);

  const renderTitle = () => {
    if (customTitle) {
      return <div className="pl-0 pr-0">{customTitle}</div>;
    }

    if (!title) {
      return null;
    }

    return (
      <div className="pl-0 pr-0">
        {!filters ? (
          <h4 className="table-title">{title}</h4>
        ) : (
          <Filters
            filters={filters}
            dropdownFilters={dropdownFilters}
            title={title}
            headerBackground={headerBackground}
            dropdownLabel={dropdownLabel}
            showDateTimePicker={showDateTimePicker}
            defaultDateRange={dateRange}
            customFilter={customFilter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>
    );
  };

  return (
    <Styles.StyledCard className={className}>
      {renderTitle()}
      {!showLess ? (
        <Styles.TableContainer>
          {loading || customLoading ? (
            <Styles.Loader>
              <CircularProgress size={40} />
            </Styles.Loader>
          ) : null}
          {!isLoading ? (
            <Styles.TableWrapper className={`table-wrapper ${rows.length ? '' : 'empty-table'}`}>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div style={{ width }}>
                    <Table
                      headerHeight={rowHeight}
                      height={tableHeight}
                      noRowsRenderer={noRowsRenderer}
                      rowHeight={rowHeight}
                      rowGetter={({ index }: { index: number }) => rows[index]}
                      rowCount={rows.length}
                      rowStyle={(info: Index) => handleRowStyle(info)}
                      width={100}
                      sortBy={sortBy}
                      sort={handleSort}
                      sortDirection={sortDirection}
                      style={{ backgroundColor: 'inherit' }}
                      onScroll={handleReachBottom}
                      overscanIndicesGetter={renderAllRows ? getOverscanIndices : undefined}
                    >
                      {columns.map(({ dataKey, dataTitle, ...other }, index) => (
                        <Column
                          key={dataKey}
                          headerRenderer={headerProps =>
                            headerRenderer({
                              ...headerProps,
                              columnIndex: index,
                            })
                          }
                          cellRenderer={props => TableCellRenderer({ ...props, dataTitle })}
                          dataKey={dataKey}
                          {...other}
                        />
                      ))}
                    </Table>
                  </div>
                )}
              </AutoSizer>
            </Styles.TableWrapper>
          ) : (
            <div style={{ height: tableHeight }}>
              <Styles.Loader>
                <CircularProgress size={40} />
              </Styles.Loader>
            </div>
          )}
        </Styles.TableContainer>
      ) : null}
    </Styles.StyledCard>
  );
};

InfinityTableComponent.defaultProps = {
  title: undefined,
  customTitle: undefined,
  filters: undefined,
  sortBy: undefined,
  sortDirection: undefined,
  rowHeight: 45,
  tableHeight: 500,
  loadMoreFrom: 0,
  disableLoading: undefined,
  renderAllRows: undefined,
  className: undefined,
  headerBackground: undefined,
  isLoading: undefined,
  dropdownFilters: undefined,
  dropdownLabel: undefined,
  customLoading: undefined,
  showDateTimePicker: false,
  dateRange: undefined,
  showLess: false,
  customFilter: null,
  onFilterChange: undefined,
};

export default InfinityTableComponent;
