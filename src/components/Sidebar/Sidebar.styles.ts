import styled from 'styled-components/macro';
import { rgba } from 'polished';
import { NavLink, match } from 'react-router-dom';

import {
  Grid as MuiGrid,
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

export const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background.default};
`;

export const Items = styled.div`
  display: flex;
  margin: ${props => props.theme.spacing(2.5)}px 0;
`;

export const Brand = styled(ListItem)<{
  button?: boolean;
  component?: React.ReactNode;
  to?: string;
}>`
  width: auto;
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.text.primary};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding: 0;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${props => props.theme.breakpoints.up('sm')} {
    min-height: 70px;
  }

  &:hover {
    background-color: transparent;
  }
`;

export const BrandLogo = styled.img`
  width: 100px;
`;

type CategoryType = {
  activeClassName?: string;
  button?: boolean;
  onClick?: () => void;
  to?: string;
  component?: typeof NavLink;
  exact?: boolean;
  isActive?: (_match: match, _location: Location) => boolean;
};

export const Category = styled(ListItem)<CategoryType>`
  margin: 0 2px;
  padding: 6px 0;
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  transition: all 0.3s ease-in-out;

  span {
    position: relative;
    display: flex;
    align-items: center;
    color: ${props => props.theme.sidebar.text.primary};
    white-space: nowrap;

    &:before {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #34a1ff;
      transition: transform 0.5s cubic-bezier(0.8, 0, 0.2, 1);
      transform: scaleX(0);
      transform-origin: 100% 50%;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    margin-left: 5px;
    color: ${props => props.theme.sidebar.text.primary};
    font-size: 1.25rem;
    opacity: 0.5;
    fill: ${props => props.theme.sidebar.text.primary};
  }

  .menu-text {
    &:hover {
      span {
        &:before {
          transform: scaleX(1);
          transform-origin: 0 50%;
        }
      }
    }
  }

  &:hover {
    background-color: transparent;
  }

  &:hover,
  &.${props => props.activeClassName} {
    background-color: transparent;
  }

  &.${props => props.activeClassName} {
    .menu-text {
      span {
        &:before {
          transform: scaleX(1);
          transform-origin: 0 50%;
        }
      }
    }
  }

  .submenu {
    position: absolute;
    top: 42px;
    left: 50%;
    display: block;
    padding: 5px 30px;
    transform: translateX(-50%);
    box-shadow: 1px 2px 40px 0 rgb(0 0 0 / 9%);
    background: #fff;
    border-radius: 8px;
  }
`;

export const CategoryText = styled(ListItemText)`
  margin: 0;

  span {
    color: ${props => props.theme.sidebar.text.primary};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    padding: 0 ${props => props.theme.spacing(3)}px;
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
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;

  &:hover {
    background-color: transparent;

    span {
      color: ${props => rgba(props.theme.sidebar.text.primary, 0.9)};
    }
  }

  &.${props => props.activeClassName} {
    background-color: transparent;

    span {
      color: ${props => props.theme.sidebar.text.primary};
    }
  }
`;

export const LinkText = styled(ListItemText)`
  margin-top: 0;
  margin-bottom: 0;
  color: ${props => props.theme.sidebar.text.primary};

  span {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
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

export const SidebarContainer = styled(MuiGrid)`
  height: 50px;
`;

export const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px ${props => props.theme.spacing(7)}px
    ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

export const SidebarFooter = styled.div`
  background-color: ${props => props.theme.palette.background.paper};
  padding: 4px ${props => props.theme.spacing(4)}px;
`;
