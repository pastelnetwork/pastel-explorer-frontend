import styled from 'styled-components/macro';
import { rgba, darken } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import {
  Box as MuiBox,
  Chip,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  Typography,
  ListItemText,
} from '@material-ui/core';

import { spacing } from '@material-ui/system';

import { ExpandLess, ExpandMore } from '@material-ui/icons';

export const Box = styled(MuiBox)(spacing);

export const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

export const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

export const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
`;

export const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

export const Brand = styled(ListItem)<{
  button?: boolean;
  component?: React.ReactNode;
  to?: string;
}>`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(6)}px;
  justify-content: center;
  cursor: pointer;

  ${props => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${props => props.theme.sidebar.header.background};
  }
`;

export const BrandLogo = styled.img`
  width: 120px;
`;

type CategoryType = {
  activeClassName?: string;
  button?: boolean;
  onClick?: () => void;
  to?: string;
  component?: typeof NavLink;
  exact?: boolean;
};

export const Category = styled(ListItem)<CategoryType>`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  padding-left: ${props => props.theme.spacing(8)}px;
  padding-right: ${props => props.theme.spacing(7)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 1.25rem;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

export const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`;

export const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

export const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

export const Link = styled(ListItem)<{
  activeClassName: string;
  component: typeof NavLink;
  exact: boolean;
  to: string;
}>`
  padding-left: ${props => props.theme.spacing(17.5)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${props => rgba(props.theme.sidebar.color, 0.9)};
  }

  &:hover {
    background-color: ${props => darken(0.015, props.theme.sidebar.background)};
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

export const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

export const LinkBadge = styled(Chip)`
  font-size: 0.75rem;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 28px;
  top: 8px;
  background: ${props => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;

export const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

export const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px ${props => props.theme.spacing(7)}px
    ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

export const SidebarFooter = styled.div`
  background-color: ${props => props.theme.sidebar.footer.background} !important;
  padding: ${props => props.theme.spacing(2.75)}px ${props => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;
