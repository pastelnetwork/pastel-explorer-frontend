import styled from 'styled-components';

import { Button } from '@mui/material';

export const ButtonStyle = styled(Button)`
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
  border-color: ${props => props.theme.sidebar.menu.default};
  color: ${props => props.theme.palette.text.primary};
  flex-direction: column;

  .MuiButton-label {
    flex-direction: column;
    justify-content: start;
  }

  &.active,
  &:hover {
    border-color: ${props => props.theme.sidebar.menu.active};
    color: ${props => props.theme.sidebar.menu.active};
    background: transparent;
  }
`;
