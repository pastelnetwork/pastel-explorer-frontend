import styled from 'styled-components';
import MuiTextField from '@mui/material/TextField';

export const TextField = styled(MuiTextField)`
  width: 100%;

  .MuiInputBase-input {
    padding: 7px 10px;
    line-height: 1;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${props => props.theme.sidebar.menu.default} !important;
    color: ${props => props.theme.sidebar.menu.default};
    border-radius: 5px;
    background: transparent;
  }
`;
