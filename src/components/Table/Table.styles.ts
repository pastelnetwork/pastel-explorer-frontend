import styled from 'styled-components/macro';

import { Card as MuiCard, Chip as MuiChip } from '@material-ui/core';

import { spacing } from '@material-ui/system';

export const Card = styled(MuiCard)(spacing);

export const Chip = styled(MuiChip)<{ rgbcolor: string }>`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${props => props.rgbcolor};
  color: ${props => props.theme.palette.common.white};
`;

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;
