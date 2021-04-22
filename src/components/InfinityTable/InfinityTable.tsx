import * as React from 'react';
import _debounce from 'lodash.debounce';
import {
  AutoSizer,
  Table,
  Column,
  TableCellProps,
  TableHeaderProps,
  ScrollEventData,
} from 'react-virtualized';

import { CardHeader, Paper, CircularProgress } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as Styles from './InfinityTable.styles';

export type HeaderType = { id: number | string; header: string };

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
  }>;
  rows: Array<RowsProps>;
  rowHeight?: number;
  tableHeight?: number;
  // eslint-disable-next-line
  onBottomReach: (value: boolean) => void;
}

const noRowsRenderer = () => <div>No data</div>;
const headerRenderer = ({ label }: TableHeaderProps & { columnIndex: number }) => (
  <Styles.HeaderCell component="div" variant="head">
    {label}
  </Styles.HeaderCell>
);
const TableCellRenderer = ({ cellData }: TableCellProps) => (
  <Styles.Cell component="div">{cellData}</Styles.Cell>
);

const InfinityTableComponent: React.FC<IInfinityTableComponentProps> = ({
  title,
  rows,
  columns,
  onBottomReach,
  rowHeight = 70,
  tableHeight = 500,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleReachBottom = _debounce(
    ({ clientHeight, scrollHeight, scrollTop }: ScrollEventData) => {
      const bottomReached = clientHeight + scrollTop >= scrollHeight;
      !loading && bottomReached && setLoading(true);

      return onBottomReach(bottomReached);
    },
    100,
  );

  React.useEffect(() => {
    loading && setLoading(false);
  }, [rows.length]);

  return (
    <Styles.Card mb={3}>
      {title && <CardHeader title={title} />}
      <Paper>
        {rows.length ? (
          <Styles.TableWrapper>
            {loading && (
              <Styles.Loader>
                <CircularProgress size={40} />
              </Styles.Loader>
            )}
            <AutoSizer disableHeight>
              {({ width }) => (
                <Table
                  headerHeight={rowHeight}
                  height={tableHeight}
                  noRowsRenderer={noRowsRenderer}
                  rowHeight={rowHeight}
                  rowGetter={({ index }: { index: number }) => rows[index]}
                  rowCount={rows.length}
                  width={width}
                  onScroll={handleReachBottom}
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
              )}
            </AutoSizer>
          </Styles.TableWrapper>
        ) : (
          <Skeleton animation="wave" variant="rect" height={tableHeight} />
        )}
      </Paper>
    </Styles.Card>
  );
};

export default InfinityTableComponent;
