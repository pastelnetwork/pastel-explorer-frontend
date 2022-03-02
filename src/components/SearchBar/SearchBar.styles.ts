import styled from 'styled-components/macro';
import { darken } from 'polished';

import {
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Grid,
  Toolbar,
} from '@material-ui/core';

import sun from '@assets/icons/sun.svg';
import moon from '@assets/icons/moon.svg';

export const ToolbarStyle = styled(Toolbar)`
  justify-content: end;
  padding-right: 0;
`;

export const GridStyle = styled(Grid)`
  max-width: 350px;

  &.popup {
    display: none;
  }

  ${props => props.theme.breakpoints.down('md')} {
    max-width: 440px;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    &.top {
      display: none;
    }

    &.popup {
      display: block;
      width: calc(100vw + 2px);
      max-width: unset;
      margin-top: 5px;
      margin-left: 3px;
      padding: 10px;
      background: ${props => props.theme.sidebar.menu.background};

      .label-input {
        max-width: 90%;
        color: ${props => props.theme.sidebar.menu.default};
        background: ${props => props.theme.sidebar.menu.background};
      }

      .input {
        border: 1px solid ${props => props.theme.sidebar.menu.default};
        color: ${props => props.theme.sidebar.menu.default};
      }
    }

    .MuiOutlinedInput-root.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border: none;
      }
    }
  }
`;

export const AppBar = styled(MuiAppBar)`
  width: 78%;
  background: ${props => props.theme.sidebar.menu.background};
  color: ${props => props.theme.header.color};

  ${props => props.theme.breakpoints.up('md')} {
    max-width: 34%;
  }

  ${props => props.theme.breakpoints.up('lg')} {
    max-width: 50%;
  }

  fieldset {
    border: 0;
  }

  .label-input {
    max-width: 84%;
    padding-left: 0 !important;
    color: ${props => props.theme.sidebar.menu.default};
    background: ${props => props.theme.sidebar.menu.background};
    line-height: 18px;
    overflow: hidden;
    transform: translate(14px, 9px) scale(1);

    &.MuiInputLabel-outlined.MuiInputLabel-shrink {
      padding-left: 10px !important;
      transform: translate(14px, -6px) scale(0.75);
    }

    ${props => props.theme.breakpoints.up('sm')} {
      max-width: 91%;
    }

    ${props => props.theme.breakpoints.up('lg')} {
      max-width: 94%;
    }
  }

  .input {
    padding: 3px !important;
    border: 1px solid ${props => props.theme.sidebar.menu.default};
    color: ${props => props.theme.sidebar.menu.default};
  }
`;

export const IconButton = styled(MuiIconButton)`
  svg {
    color: ${props => props.theme.palette.text.primary};
    width: 22px;
    height: 22px;
  }

  &.search-icon {
    display: none;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 8px;

    &.search-icon {
      display: inline-block;
    }
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
  width: 52px;
  min-width: 52px;
  margin-right: 5px;
  height: 26px;
  border-radius: 100px;
  overflow: hidden;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 48px;
    min-width: 48px;
    margin-right: 0;
  }

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
        background-color: ${props => props.theme.sidebar.menu.toggle.background};
      }

      & + .toggle-switch {
        :before {
          left: 30px;
          background-color: ${props => props.theme.sidebar.menu.toggle.switch};
          background-image: url(${sun});
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
      background-color: ${props => props.theme.sidebar.menu.toggle.switch};
      transition: all 0.3s ease, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
      background-image: url(${moon});
      background-size: 14px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .toggle-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${props => props.theme.sidebar.menu.toggle.background};
    transition: all 0.3s ease;
    z-index: 1;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    transform: scale(0.8);
  }
`;
