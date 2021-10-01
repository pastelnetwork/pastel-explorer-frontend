import styled from 'styled-components/macro';

import { Card as MuiCard, darken, TableCell, Paper } from '@material-ui/core';
import { spacing } from '@material-ui/system';

const StyledCard = styled(MuiCard)`
  background-color: ${props => props.theme.palette.background.paper} !important;
  padding: 0 ${props => props.theme.spacing(9)}px;
  padding-bottom: 32px !important;
  @media (max-width: 960px) {
    padding: 0 ${props => props.theme.spacing(2)}px;
    padding-bottom: 8px !important;
  }

  .pl-0 {
    padding-left: 0;
  }
`;

export const Card = styled(StyledCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
  background-color: ${props => props.theme.palette.background.default} !important;
  border-radius: 16px;

  * {
    outline: 0;
  }
  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Grid {
    min-width: 1000px;
    width: 100% !important;
    background-color: ${props => props.theme.palette.background.default} !important;

    &::-webkit-scrollbar {
      width: 18px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.scrollbar};
    }
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    max-width: 100% !important;
  }

  .ReactVirtualized__Table__row {
    width: 100% !important;
    background-color: ${props => props.theme.palette.background.default};
    &:nth-of-type(odd): {
      background-color: ${props => darken(props.theme.palette.background.default, 0.5)} !important;
    }
    svg {
      color: ${props => props.theme.palette.text.primary};
    }
  }
  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__row {
    display: flex;
    transition: all 0.2s ease-in !important;
    &:hover {
      background-color: ${props => darken(props.theme.palette.background.default, 0.07)} !important;
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
  color: ${props => props.theme.palette.text.primary};
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
