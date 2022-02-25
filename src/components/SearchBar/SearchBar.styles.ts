import styled from 'styled-components/macro';
import { darken } from 'polished';

import {
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Grid,
} from '@material-ui/core';

export const AppBar = styled(MuiAppBar)`
  width: 44%;
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

export const ModeToggle = styled.div`
  position: relative;
  top: 50%;
  width: 52px;
  min-width: 52px;
  height: 26px;
  border-radius: 100px;
  overflow: hidden;

  input {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;

    &:checked {
      & ~ .toggle-bg {
        background-color: #1d1e31;
      }

      & + .toggle-switch {
        :before {
          content: ' ';
          left: 30px;
          background-color: #678be0;
        }
      }
    }
  }

  .toggle-switch {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;

    &:before {
      content: ' ';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 16px;
      text-align: center;
      line-height: 18px;
      color: #fff;
      background-color: #34a1ff;
      transition: all 0.3s ease, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
    }
  }

  .toggle-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ebf7fc;
    transition: all 0.3s ease;
    z-index: 1;
  }
`;
