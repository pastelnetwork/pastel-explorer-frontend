import styled from 'styled-components/macro';

import { Card as MuiCard, TableCell as MuiTableCell, CardHeader, Paper } from '@material-ui/core';

import { spacing } from '@material-ui/system';

const StyledCard = styled(MuiCard)`
  box-shadow: none;
  overflow: unset;
`;

export const Card = styled(StyledCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
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
