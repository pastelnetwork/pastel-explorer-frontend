import styled from 'styled-components/macro';

import { Card as MuiCard, TableCell } from '@material-ui/core';

import { spacing } from '@material-ui/system';

export const Card = styled(MuiCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);

  * {
    outline: 0;
  }

  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__row {
    display: flex;
  }
`;

export const Cell = styled(TableCell)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const HeaderCell = styled(TableCell)<{ $disabledSort: boolean }>`
  height: 70px;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  cursor: ${({ $disabledSort }) => !$disabledSort && 'pointer'};
`;

export const Loader = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  justify-content: center;
  align-items: center;
`;
