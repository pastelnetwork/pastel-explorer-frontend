import {
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';

import * as Styles from './Table.styles';

export type HeaderType = { id: number | string; header: string };

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
}

const TableComponent: React.FC<TableComponentProps> = ({ title, headers, rows, styles }) => (
  <Styles.Card mb={3} style={styles}>
    {title && <CardHeader title={title} />}
    <Paper>
      {rows ? (
        <Styles.TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(({ id, header }) => (
                  <TableCell key={id}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ id, data }) => (
                <TableRow key={id}>
                  {data.map(dataElement => (
                    <TableCell key={dataElement.id}>{dataElement.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Styles.TableWrapper>
      ) : (
        <Skeleton animation="wave" variant="rect" height={200} />
      )}
    </Paper>
  </Styles.Card>
);

export default TableComponent;
