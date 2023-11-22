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

export const ClusterWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 525px;
  margin-top: 53px;
  min-height: 175px;
  overflow-y: auto;
  overflow-x: hidden;

  &.explorer-api {
    max-height: 100%;
    min-height: unset;
    height: auto;
    margin-top: 0;
  }
`;

export const ExplorerAPIWrapper = styled.div`
  width: 100%;
  max-height: 65vh;
  margin-top: 15px;

  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
  }
`;

export const ExplorerApiItem = styled.div`
  padding: 5px;
  margin-bottom: 0;

  &:nth-of-type(odd) {
    background-color: ${props => props.theme.table.odd} !important;
  }

  &:hover {
    background-color: ${props => props.theme.table.hover} !important;
  }
`;

export const ExplorerApiLink = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  text-align: left;
  text-decoration: none;

  .item-title,
  .item-value {
    color: ${props => props.theme.sidebar.menu.toggle.switch};
    word-break: break-all;
  }
`;

export const LinkButtonWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export const LinkButton = styled.a`
  color: ${props => props.theme.sidebar.menu.toggle.switch};
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  border: 0;
  outline: none;
  transition: all 0.5s ease;
  text-decoration: none;
`;
