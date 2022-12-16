import styled from 'styled-components/macro';

import { Card as MuiCard, TableCell as MuiTableCell, CardHeader, Paper } from '@material-ui/core';

import { spacing } from '@material-ui/system';

const StyledCard = styled(MuiCard)`
  margin-bottom: 1px !important;
  box-shadow: none;
  overflow: unset;
`;

export const Card = styled(StyledCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

export const TableCardHeader = styled(CardHeader)`
  padding-left: 0;
  word-break: break-word;

  span {
    &.MuiCardHeader-title {
      color: ${props => props.theme.palette.text.primary};
      font-weight: 700;
      font-size: 1rem;
    }
  }
`;

export const TableCell = styled(MuiTableCell)`
  font-weight: 700;
  cursor: pointer;
`;

export const RowCell = styled(MuiTableCell)`
  padding: 5px 16px;
`;

export const PaperWrapper = styled(Paper)`
  box-shadow: rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px !important;
  background: transparent;
`;

export const BlockWrapper = styled.div`
  margin-bottom: 30px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  .custom-table {
    .table__row-header {
      th {
        padding: 9px 16px;
        background-color: ${props => props.theme.table.header} !important;
      }
    }

    .table__row {
      background-color: ${props => props.theme.table.even} !important;
      transition: all 0.5s ease;

      &:nth-of-type(odd) {
        background-color: ${props => props.theme.table.odd} !important;
      }

      td,
      th {
        padding: 12px 16px;
      }

      &:last-child {
        td,
        th {
          border-bottom: none;
        }
      }

      &:hover {
        background-color: ${props => props.theme.table.hover} !important;
      }
    }
  }

  &.mb-20 {
    margin-bottom: 20px;
  }

  &.mb-0 {
    margin-bottom: 0;
  }
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding: 18px 16px;
  background: ${props => props.theme.card.titleColor};
`;

export const Loader = styled.h4`
  text-align: center;
`;
