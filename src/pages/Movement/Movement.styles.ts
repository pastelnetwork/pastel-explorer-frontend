import styled from 'styled-components/macro';

import { Chip as MuiChip } from '@material-ui/core';

export const Chip = styled(MuiChip)<{ chipcolor: string }>`
  background-color: ${({ chipcolor }) => chipcolor};
`;
