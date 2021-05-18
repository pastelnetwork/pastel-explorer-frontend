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
import { CSSProperties } from '@material-ui/styles';
import { CardHeader, CircularProgress, darken } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import themeVariant from '@theme/variants';

import * as Styles from './InfinityTable.styles';

export type HeaderType = { id: number | string; header: string };

export type SortDirectionsType = 'ASC' | 'DESC';

export interface ISortData {
  sortBy: string;
  sortDirection: SortDirectionsType;
}

export interface RowsProps {
  [key: string]: number | string | JSX.Element;
}

interface IInfinityTableComponentProps {
  title?: string;
  columns: Array<{
    width: number;
    flexGrow: number;
    label: string;
    dataKey: string;
    disableSort: boolean;
  }>;
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
}

const noRowsRenderer = () => (
  <Styles.Loader>
    <CircularProgress size={40} />
  </Styles.Loader>
);
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
      {label}
      {showSort && renderSortIcon()}
    </Styles.HeaderCell>
  );
};
const TableCellRenderer = ({ cellData }: TableCellProps) => (
  <Styles.Cell component="div">{cellData}</Styles.Cell>
);

const getOverscanIndices = ({ cellCount }: OverscanIndicesGetterParams) => ({
  overscanStartIndex: 0,
  overscanStopIndex: cellCount - 1,
});

const InfinityTableComponent: React.FC<IInfinityTableComponentProps> = ({
  title,
  rows,
  columns,
  sortBy,
  sortDirection,
  loadMoreFrom = 0,
  onBottomReach,
  onHeaderClick,
  rowHeight = 45,
  tableHeight = 500,
  disableLoading,
  renderAllRows,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleReachBottom = _debounce(
    ({ clientHeight, scrollHeight, scrollTop }: ScrollEventData) => {
      if (!onBottomReach || rows.length < loadMoreFrom) return null;

      const bottomReached = clientHeight + scrollTop >= scrollHeight;
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
    const color = themeVariant.palette.background.paper;
    if (index % 2 === 0) {
      return {
        backgroundColor: darken(color, 0.05),
      };
    }

    return {
      backgroundColor: color,
    };
  };

  React.useEffect(() => {
    loading && setLoading(false);
  }, [rows]);

  return (
    <Styles.Card mb={3}>
      {title && <CardHeader title={title} />}
      <Styles.TableContainer>
        {loading && (
          <Styles.Loader>
            <CircularProgress size={40} />
          </Styles.Loader>
        )}
        {rows.length ? (
          <Styles.TableWrapper>
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
                    width={1920}
                    sortBy={sortBy}
                    sort={handleSort}
                    sortDirection={sortDirection}
                    onScroll={handleReachBottom}
                    overscanIndicesGetter={renderAllRows ? getOverscanIndices : undefined}
                  >
                    {columns.map(({ dataKey, ...other }, index) => (
                      <Column
                        key={dataKey}
                        headerRenderer={headerProps =>
                          headerRenderer({
                            ...headerProps,
                            columnIndex: index,
                          })
                        }
                        cellRenderer={TableCellRenderer}
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
          <Skeleton animation="wave" variant="rect" height={tableHeight} />
        )}
      </Styles.TableContainer>
    </Styles.Card>
  );
};

export default InfinityTableComponent;
