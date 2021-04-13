import styled from 'styled-components/macro';

import { Chip as MuiChip } from '@material-ui/core';

export const Chip = styled(MuiChip)<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
