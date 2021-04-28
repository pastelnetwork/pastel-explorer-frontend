import styled from 'styled-components/macro';

import { Card as MuiCard, darken, TableCell } from '@material-ui/core';
import { spacing } from '@material-ui/system';

import themeVariant from '@theme/variants';

export const Card = styled(MuiCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);

  * {
    outline: 0;
  }

  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Grid {
    min-width: 1000px;
    width: 100% !important;
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    max-width: 100% !important;
  }

  .ReactVirtualized__Table__row {
    width: 100% !important;
  }

  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__row {
    display: flex;
    transition: all 0.2s ease-in !important;

    &:hover {
      background-color: ${darken(themeVariant.palette.background.paper, 0.1)} !important;
    }
  }
`;

export const Cell = styled(TableCell)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100%;
  align-items: center;
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
  width: 1000px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  justify-content: center;
  align-items: center;

  @media (min-width: 1000px) {
    width: 100%;
  }
`;
