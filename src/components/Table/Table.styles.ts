import styled from 'styled-components/macro';

import { Card as MuiCard, TableCell as MuiTableCell, CardHeader } from '@material-ui/core';

import { spacing } from '@material-ui/system';

export const Card = styled(MuiCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  background: ${props => props.theme.palette.background.default};
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

export const TableCardHeader = styled(CardHeader)`
  word-break: break-word;
`;

export const TableCell = styled(MuiTableCell)`
  font-weight: 700;
`;

export const RowCell = styled(MuiTableCell)`
  padding: 5px 16px;
`;
