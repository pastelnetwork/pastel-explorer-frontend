import styled from 'styled-components/macro';

import { Card as MuiCard, CardHeader } from '@material-ui/core';

import { spacing } from '@material-ui/system';

export const Card = styled(MuiCard)(spacing);

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

export const TableCardHeader = styled(CardHeader)`
  word-break: break-word;
`;
