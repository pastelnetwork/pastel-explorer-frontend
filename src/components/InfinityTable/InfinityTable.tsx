import * as React from 'react';
import {
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { InfiniteLoader, AutoSizer } from 'react-virtualized';

import * as Styles from './InfinityTable.styles';

export type HeaderType = { id: number | string; header: string };

export interface RowsProps {
  id: string | number;
  data: Array<RowsDataType>;
}

type RowsDataType = { value: number | string | JSX.Element; id: number };

interface IInfinityTableComponentProps {
  title?: string;
  headers: Array<HeaderType>;
  rows: Array<RowsProps> | null;
}

// const STATUS_LOADING = 1;

const InfinityTableComponent: React.FC<IInfinityTableComponentProps> = ({
  title,
  headers,
  rows,
}) => {
  const [loaderData, setLoaderData] = React.useState<any>({
    loadedRowCount: 0,
    loadedRowsMap: {},
    loadingRowCount: 0,
  });

  const handleIsRowLoaded = ({ index }: any) => {
    const { loadedRowsMap } = loaderData;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  };

  const handleLoadMoreRows = ({ startIndex, stopIndex }: any) => {
    const { loadingRowCount } = loaderData;
    const increment = stopIndex - startIndex + 1;

    // for (let i = startIndex; i <= stopIndex; i++) {
    //   loadedRowsMap[i] = STATUS_LOADING;
    // }

    setLoaderData((prevState: any) => ({
      ...prevState,
      loadingRowCount: loadingRowCount + increment,
    }));

    return new Promise(resolve => resolve);
  };

  return (
    <Styles.Card mb={3}>
      {title && <CardHeader title={title} />}
      <Paper>
        <Styles.TableWrapper>
          <InfiniteLoader
            rowCount={10}
            isRowLoaded={handleIsRowLoaded}
            loadMoreRows={handleLoadMoreRows}
          >
            {({ registerChild }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Table width={width}>
                    <TableHead>
                      <TableRow>
                        {headers.map(({ id, header }) => (
                          <TableCell align="center" key={id}>
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody ref={registerChild}>
                      {rows &&
                        rows.map(({ id, data }) => (
                          <TableRow key={id}>
                            {data.map(dataElement => (
                              <TableCell key={dataElement.id} align="center">
                                {dataElement.value}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </Styles.TableWrapper>
      </Paper>
    </Styles.Card>
  );
};

export default InfinityTableComponent;
