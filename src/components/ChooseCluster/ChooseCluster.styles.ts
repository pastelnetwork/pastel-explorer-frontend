import styled from 'styled-components/macro';

import { Button } from '@material-ui/core';

export const ButtonStyle = styled(Button)`
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
  border-color: ${props => props.theme.sidebar.menu.default};

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
