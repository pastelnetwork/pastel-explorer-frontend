import styled from 'styled-components/macro';

import { Card as MuiCard, TableCell, Paper } from '@material-ui/core';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { spacing } from '@material-ui/system';

const StyledCard = styled(MuiCard)`
  background-color: ${props => props.theme.palette.background.paper} !important;
  padding: 0 ${props => props.theme.spacing(9)}px;
  padding-bottom: 0 !important;
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

  &.empty-table {
    .ReactVirtualized__Grid {
      height: 46vh !important;
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
  bottom: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 100;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${props => props.theme.breakpoints.down('sm')} {
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

export const EmptyData = styled.div`
  display: block;
  min-height: 10vh;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .filter-item {
    transition: none;

    &-active,
    &:hover {
      background: ${props => props.theme.filter.background};
    }

    &.date-picker {
      overflow: unset;
    }
  }

  .dropdown-filter {
    width: 200px;
    margin-right: 15px;
    flex-direction: row;
    align-items: center;

    .dropdown-label {
      margin-right: 5px;
    }

    label + .MuiInput-formControl {
      margin-top: 0;
    }

    .MuiInputLabel-formControl {
      top: -16px;
      left: 6px;
    }

    .MuiInput-underline {
      &:after,
      &:before {
        display: none;
      }
    }

    .MuiInputBase-root {
      width: 120px;
      padding-left: 5px;
      border: 1px solid ${props => props.theme.filter.border};
      border-radius: 4px;
      background: transparent;
    }

    .MuiSelect-select.MuiSelect-select {
      background: transparent;
    }

    .MuiSelect-icon {
      top: calc(50% - 14px);
      color: ${props => props.theme.palette.text.primary};
    }
  }

  ${props => props.theme.breakpoints.down(680)} {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .dropdown-filter {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  ${props => props.theme.breakpoints.down('xs')} {
    .filter-item {
      button {
        min-width: unset;
        padding-left: 18px;
        padding-right: 18px;
      }
    }
  }
`;

export const MenuList = styled.div`
  max-height: 300px;
  overflow-y: auto;

  .MuiCheckbox-root {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const FilterButtonWrapper = styled.div`
  position: sticky;
  bottom: -5px;
  width: 100%;
  padding: 10px 5px 10px 0;
  text-align: right;
  background-color: ${props => props.theme.palette.background.default};
  z-index: 2;

  .btn-filter,
  .btn-close {
    padding: 4px 25px;
    background: ${props => props.theme.sidebar.menu.toggle.switch};
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Gill Sans';
    cursor: pointer;
    border-radius: 10px;
    border: 0;
    outline: none;
    transition: all 0.5s ease;

    &:hover {
      background: ${props => props.theme.sidebar.menu.toggle.hover};
    }
  }

  .btn-close {
    margin-right: 10px;
    background: ${props => props.theme.sidebar.menu.toggle.period};

    &:hover {
      background: ${props => props.theme.sidebar.menu.border};
    }
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  .MuiCheckbox-root {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
`;
