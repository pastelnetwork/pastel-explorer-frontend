import styled from 'styled-components/macro';

import { Card as MuiCard, TableCell, Paper } from '@material-ui/core';
import { spacing } from '@material-ui/system';

const StyledCard = styled(MuiCard)`
  background-color: ${props => props.theme.palette.background.paper} !important;
  padding: 0 ${props => props.theme.spacing(9)}px;
  padding-bottom: 32px !important;
  box-shadow: none;

  @media (max-width: 960px) {
    padding: 0 ${props => props.theme.spacing(2)}px;
    padding-bottom: 8px !important;
  }

  .pl-0 {
    padding-left: 0;
  }

  .pr-0 {
    padding-right: 0;
  }

  .list-filter {
    border: 1px solid ${props => props.theme.filter.border};
  }

  .filter-item {
    transition: none;

    &-active,
    &:hover {
      background: ${props => props.theme.filter.background};
    }
  }
`;

export const Card = styled(StyledCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: 100%;
  background-color: ${props => props.theme.palette.background.default} !important;

  * {
    outline: 0;
  }
  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Grid {
    min-width: 1000px;
    width: 100% !important;
    background-color: ${props => props.theme.palette.background.default} !important;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.scrollbar};
      border-radius: 8px;
    }
  }

  .ReactVirtualized__Grid {
    padding-right: 0;
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    max-width: 100% !important;
  }

  .ReactVirtualized__Table__row {
    width: 100% !important;
    padding-right: 0 !important;

    svg {
      color: ${props => props.theme.palette.text.primary};
    }
  }
  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__row {
    display: flex;
    transition: all 0.5s ease !important;
  }

  .ReactVirtualized__Table__headerRow {
    background-color: ${props => props.theme.table.header} !important;
  }

  .ReactVirtualized__Table__row {
    background-color: ${props => props.theme.table.even} !important;

    &:nth-of-type(odd) {
      background-color: ${props => props.theme.table.odd} !important;
    }

    &:hover {
      background-color: ${props => props.theme.table.hover} !important;
    }
  }
`;

export const TableContainer = styled(Paper)`
  position: relative;
  background: ${props => props.theme.palette.background.default};
  box-shadow: rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px !important;
`;

export const Cell = styled(TableCell)`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
`;

export const HeaderCell = styled(TableCell)<{ $disabledSort: boolean }>`
  font-weight: 700;
  height: 45px;
  display: flex;
  white-space: nowrap;
  padding-top: 8px;
  color: ${props => props.theme.palette.text.primary};
  cursor: ${({ $disabledSort }) => !$disabledSort && 'pointer'};
`;

export const Loader = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${props => props.theme.breakpoints.down('xs')} {
    flex-direction: column;
  }

  &.background {
    margin: 0;
    padding: 13px 16px;
    background: ${props => props.theme.card.titleColor};

    h4 {
      margin: 0;
    }
  }
`;
