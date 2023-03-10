import { MouseEvent, useCallback, ReactNode } from 'react';
import { CircularProgress, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

import { translate } from '@utils/helpers/i18n';
import { getCurrencyName } from '@utils/appInfo';

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
  className?: string;
  blockWrapperClassName?: string;
  tableWrapperClassName?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  title,
  headers,
  rows,
  styles,
  handleClickSort,
  className = '',
  blockWrapperClassName = '',
  tableWrapperClassName = '',
  children,
  isLoading,
}) => {
  const onClickHeader = useCallback((event: MouseEvent<HTMLTableHeaderCellElement>) => {
    if (handleClickSort) {
      handleClickSort(event);
    }
  }, []);
  return (
    <Styles.BlockWrapper className={blockWrapperClassName}>
      <Styles.Card mb={3} style={styles}>
        {title && <Styles.BlockTitle>{title}</Styles.BlockTitle>}
        <Styles.PaperWrapper>
          {!isLoading ? (
            <Styles.TableWrapper className={tableWrapperClassName}>
              <Table className={`custom-table ${className}`}>
                <TableHead className="table__row-header">
                  <TableRow>
                    {headers.map(({ id, header, key }) => (
                      <Styles.TableCell key={id} data-id={key} onClick={onClickHeader}>
                        {translate(header, { currency: getCurrencyName() })}
                      </Styles.TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map(({ id, data }) => (
                    <TableRow key={id} className="table__row">
                      {data.map((dataElement, index) => (
                        <Styles.RowCell
                          key={dataElement.id}
                          data-title={translate(headers[index].header, {
                            currency: getCurrencyName(),
                          })}
                          className="cell-content"
                        >
                          {dataElement.value}
                        </Styles.RowCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Styles.TableWrapper>
          ) : (
            <Styles.Loader style={{ height: styles?.height || 200 }}>
              <CircularProgress size={40} />
            </Styles.Loader>
          )}
        </Styles.PaperWrapper>
      </Styles.Card>
      {children}
    </Styles.BlockWrapper>
  );
};

export default TableComponent;
