import styled from 'styled-components/macro';

import { Card as MuiCard, darken, TableCell, Paper } from '@material-ui/core';
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
    background-color: ${props => props.theme.palette.background.default} !important;
    &::-webkit-scrollbar-track {
      background: black;
    }
    &::-webkit-scrollbar-track {
      background: grey;
    }
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    max-width: 100% !important;
  }

  .ReactVirtualized__Table__row {
    width: 100% !important;
    background-color: ${props => props.theme.palette.background.default} !important;
    svg {
      color: ${props => props.theme.palette.text.default};
    }
  }

  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__row {
    display: flex;
    transition: all 0.2s ease-in !important;

    &:hover {
      background-color: ${darken(themeVariant.palette.background.default, 0.5)} !important;
    }
  }
`;

export const TableContainer = styled(Paper)`
  position: relative;
  background: ${props => props.theme.palette.background.default};
`;

export const Cell = styled(TableCell)`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
`;

export const HeaderCell = styled(TableCell)<{ $disabledSort: boolean }>`
  font-weight: 700;
  height: 70px;
  display: flex;
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
