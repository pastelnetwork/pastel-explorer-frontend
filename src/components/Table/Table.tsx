import { MouseEvent, useCallback, ReactNode } from 'react';
import { CircularProgress, Table, TableBody, TableHead, TableRow } from '@mui/material';
import { CSSProperties } from '@mui/styles';
import parse from 'html-react-parser';

import { translate, translateDropdown } from '@utils/helpers/i18n';
import { getCurrencyName } from '@utils/appInfo';

import * as Styles from './Table.styles';

export type HeaderType = { id: number | string; header: string; key?: string };

export interface RowsProps {
  id: string | number;
  data: Array<RowsDataType>;
}

type RowsDataType = { value: number | string | JSX.Element; id: number };

interface TableComponentProps {
  title?: JSX.Element | string | ReactNode;
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
      <Styles.StyledCard sx={{ mb: 3 }} style={styles}>
        {title && <Styles.BlockTitle>{title}</Styles.BlockTitle>}
        <Styles.PaperWrapper>
          {!isLoading ? (
            <Styles.TableWrapper className={tableWrapperClassName}>
              <Table className={`custom-table ${className}`}>
                <TableHead className="table__row-header">
                  <TableRow>
                    {headers.map(({ id, header, key }) => (
                      <Styles.TableCell key={id} data-id={key} onClick={onClickHeader}>
                        {parse(translate(header, { currency: getCurrencyName() }))}
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
                          data-title={translateDropdown(headers[index].header, {
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
      </Styles.StyledCard>
      {children}
    </Styles.BlockWrapper>
  );
};

export default TableComponent;
