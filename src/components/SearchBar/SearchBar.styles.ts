import styled from 'styled-components/macro';
import { darken } from 'polished';

import {
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Grid,
} from '@material-ui/core';

export const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.palette.background.default};
  color: ${props => props.theme.header.color};

  fieldset {
    border: 0;
  }
`;

export const IconButton = styled(MuiIconButton)`
  svg {
    color: ${props => props.theme.palette.text.primary};
    width: 22px;
    height: 22px;
  }
`;

export const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => props.theme.palette.background.default};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.05, props.theme.palette.background.default)};
  }

  ${props => props.theme.breakpoints.up('md')} {
    display: block;
  }
`;

export const AutocompleteWrapper = styled(Grid)`
  width: 100%;
  margin-right: 5px;
  ${props => props.theme.breakpoints.down('md')} {
    margin-right: 0;
  }
  .MuiFormLabel-root {
    display: inline-block;
    width: auto;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
    width: 100%;
  }
`;
