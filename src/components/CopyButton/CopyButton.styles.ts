import styled from 'styled-components';

import { IconButton as MuiIconButton } from '@mui/material';

export const IconButton = styled(MuiIconButton)`
  margin: 0 3px;
  padding: 5px;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: ${props => props.theme.palette.text.primary} !important;
  }
`;
