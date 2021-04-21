import {
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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

const InfinityTableComponent: React.FC<IInfinityTableComponentProps> = ({
  title,
  headers,
  rows,
}) => (
  <Styles.Card mb={3}>
    {title && <CardHeader title={title} />}
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
                      {dataElement.value}
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

export default InfinityTableComponent;
