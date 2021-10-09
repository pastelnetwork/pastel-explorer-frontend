import { MouseEvent, useCallback } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';

import * as Styles from './Table.styles';

export type HeaderType = { id: number | string; header: string; key?: string };

export interface RowsProps {
  id: string | number;
  data: Array<RowsDataType>;
}

type RowsDataType = { value: number | string | JSX.Element; id: number };

interface TableComponentProps {
  title?: JSX.Element | string;
  headers: Array<HeaderType>;
  rows: Array<RowsProps> | null;
  styles?: Partial<CSSProperties>;
  handleClickSort?: (_event: MouseEvent<HTMLTableHeaderCellElement>) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  title,
  headers,
  rows,
  styles,
  handleClickSort,
}) => {
  const onClickHeader = useCallback((event: MouseEvent<HTMLTableHeaderCellElement>) => {
    if (handleClickSort) {
      handleClickSort(event);
    }
  }, []);
  return (
    <Styles.Card mb={3} style={styles}>
      {title && <h4>{title}</h4>}
      <Styles.PaperWrapper>
        {rows ? (
          <Styles.TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(({ id, header, key }) => (
                    <Styles.TableCell key={id} data-id={key} onClick={onClickHeader}>
                      {header}
                    </Styles.TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({ id, data }) => (
                  <TableRow key={id}>
                    {data.map(dataElement => (
                      <Styles.RowCell key={dataElement.id}>{dataElement.value}</Styles.RowCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Styles.TableWrapper>
        ) : (
          <Skeleton animation="wave" variant="rect" height={styles?.height || 200} />
        )}
      </Styles.PaperWrapper>
    </Styles.Card>
  );
};

export default TableComponent;
