import styled from 'styled-components/macro';

import { IconButton as MuiIconButton } from '@material-ui/core';

export const IconButton = styled(MuiIconButton)`
  margin: 0 3px;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: ${props => props.theme.palette.text.primary} !important;
  }
`;
