import * as React from 'react';

import {
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as Styles from './Table.styles';

export type HeaderType = { id: number | string; header: string };

export interface RowsProps {
  id: string;
  data: Array<RowsDataType>;
}

type RowsDataType = { value: number | string; id: number };

interface TableComponentProps {
  title: string;
  headers: Array<HeaderType>;
  rows: Array<RowsProps> | null;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, headers, rows }) => (
  <Styles.Card mb={3}>
    <CardHeader title={title} />
    <Paper>
      {rows ? (
        <Styles.TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(({ id, header }) => (
                  <TableCell align="center" key={id}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ id, data }) => (
                <TableRow key={id}>
                  {data.map(dataElement => (
                    <TableCell key={dataElement.id} align="center">
                      <Typography style={{ wordWrap: 'break-word' }}>
                        {dataElement.value}
                      </Typography>
                    </TableCell>
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
