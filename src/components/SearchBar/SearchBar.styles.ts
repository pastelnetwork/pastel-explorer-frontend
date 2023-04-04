import styled from 'styled-components/macro';

import { AppBar as MuiAppBar, IconButton as MuiIconButton, Grid, Toolbar } from '@material-ui/core';

import sun from '@assets/icons/sun.svg';
import moon from '@assets/icons/moon.svg';

export const ToolbarStyle = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 0;
`;

export const GridStyle = styled(Grid)`
  max-width: 530px;

  &.search-popup {
    display: none;
    position: fixed;
    right: 0;
    top: 45px;
    width: 100vw;
    max-width: unset;
    margin-top: 5px;
    margin-left: 0;
    padding: 10px;
    background: ${props => props.theme.sidebar.menu.background};
  }

  ${props => props.theme.breakpoints.down('md')} {
    max-width: 200px;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    &.top {
      display: none;
    }

    &.search-popup {
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

  .MuiInputBase-input {
    font-size: 13px;
  }

  @media (max-width: 1424px) and (min-width: 900px) {
    &.autocomplete-focus {
      position: absolute;
      right: 76px;
      width: 55vw;
      max-width: 74vw;
      background: ${props => props.theme.sidebar.menu.background};
      z-index: 100;

      .label-input {
        max-width: 100%;
        width: auto;
      }
    }
  }

  @media (max-width: 900px) and (min-width: 600px) {
    &.autocomplete-focus {
      position: absolute;
      right: 76px;
      width: 74vw;
      max-width: 74vw;
      background: ${props => props.theme.sidebar.menu.background};
      z-index: 100;

      .label-input {
        max-width: 100%;
        width: auto;
      }
    }
  }
`;

export const AppBar = styled(MuiAppBar)`
  display: flex;
  width: calc(100% - 120px);
  background: ${props => props.theme.sidebar.menu.background};
  color: ${props => props.theme.header.color};
  transition: min-height 0.5s ease-in;
  z-index: 10;

  ${props => props.theme.breakpoints.up('md')} {
    max-width: 28%;
  }

  ${props => props.theme.breakpoints.up('lg')} {
    max-width: calc(100% - 783px);
  }

  fieldset {
    border: 0;
  }

  .label-input {
    max-width: 84%;
    padding-left: 0 !important;
    color: ${props => props.theme.sidebar.menu.default};
    background: ${props => props.theme.sidebar.menu.background};
    font-size: 13px;
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
      max-width: 96%;
    }
  }

  .input {
    padding: 3px !important;
    border: 1px solid ${props => props.theme.sidebar.menu.default};
    color: ${props => props.theme.sidebar.menu.default};
  }

  ${props => props.theme.breakpoints.down('xs')} {
    &.search-show,
    &.force {
      min-height: 108px;

      .search-popup {
        display: block;
      }

      .search-icon {
        svg {
          fill: ${props => props.theme.sidebar.menu.active};
        }
      }
    }
  }
`;

export const IconButton = styled(MuiIconButton)`
  svg {
    color: ${props => props.theme.sidebar.menu.default};
    width: 22px;
    height: 22px;
  }

  &.search-icon {
    display: none;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 6px;

    &.search-icon {
      display: inline-block;
    }
  }
`;

export const AutocompleteWrapper = styled(Grid)`
  width: 100%;
  margin-right: 15px;

  ${props => props.theme.breakpoints.down('md')} {
    margin-right: 5px;
  }

  .MuiFormLabel-root {
    display: inline-block;
    width: auto;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .MuiAutocomplete-hasClearIcon {
    &:focus,
    &:hover {
      .MuiInputBase-input {
        padding-right: 34px !important;
      }
    }
  }

  .MuiInputBase-input {
    &:focus {
      padding-right: 34px !important;
    }
  }
`;

export const ModeToggle = styled.div`
  position: relative;
  width: 52px;
  min-width: 52px;
  margin-right: 13px;
  height: 26px;
  border-radius: 100px;
  overflow: hidden;

  ${props => props.theme.breakpoints.down('md')} {
    margin-right: 7px;
  }

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
          background-image: url(${moon});
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
      background-image: url(${sun});
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
    margin-right: 6px;
    transform: scale(0.8);
  }
`;
