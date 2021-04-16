import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { Chip as MuiChip } from '@material-ui/core';

export const Chip = styled(MuiChip)<{ chipcolor: string }>`
  background-color: ${({ chipcolor }) => chipcolor};
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
