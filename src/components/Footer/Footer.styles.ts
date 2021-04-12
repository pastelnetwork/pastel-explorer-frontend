import styled from 'styled-components/macro';

import {
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps,
} from '@material-ui/core';

interface ListItemProps extends MuiListItemProps {
  component?: string;
  href?: string;
  button?: boolean | undefined;
}

export const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(1) / 4}px ${props => props.theme.spacing(4)}px;
  background: ${props => props.theme.footer.background};
  position: relative;
`;

export const ListItem = styled(MuiListItem)<ListItemProps>`
  display: inline-block;
  width: auto;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;

  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

export const ListItemText = styled(MuiListItemText)`
  span {
    color: ${props => props.theme.footer.color};
  }
`;
