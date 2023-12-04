import styled from 'styled-components';
import { rgba } from 'polished';
import { NavLink, UIMatch } from 'react-router-dom';

import { Chip, Drawer as MuiDrawer, ListItem, Typography, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const DrawerMobile = styled(MuiDrawer)`
  ${props => props.theme.breakpoints.down('sm')} {
    .MuiDrawer-paper {
      width: 90vw;
      max-width: 325px;
    }

    .close-button {
      display: inline-block;
      width: 40px;
      min-width: unset;
      height: 40px;
      margin-left: auto;
      margin-right: 6px;
      margin-top: 6px;
      border-radius: 100%;

      span {
        width: auto;
        display: inline-block;
      }
    }

    .close-icon {
      width: 16px;
      color: ${props => props.theme.sidebar.menu.default};
    }
  }
`;

export const Items = styled.div`
  display: flex;
  margin: ${props => props.theme.spacing(2.5)}px 0;
  padding: 0 20px;

  .MuiListItem-root {
    padding: 10px 12px;
  }

  ${props => props.theme.breakpoints.between('sm', 1400)} {
    padding: 0 10px;

    .MuiListItem-root {
      padding: 10px 0;
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
    width: 100%;
    margin-top: 0;
    padding: 0 15px;
  }
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
  margin-right: 25px;
  padding: 0;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.footer {
    margin-right: 0;
    justify-content: flex-end;

    &.center {
      justify-content: center;
      margin-bottom: 25px;
    }
  }

  &:hover {
    background-color: transparent;
  }

  .MuiBox-root {
    display: flex;
    align-items: center;
    margin-left: 0;
  }

  ${props => props.theme.breakpoints.between('sm', 1400)} {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    width: 50%;
    text-align: center;
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
  isActive?: (_match: UIMatch, _location: Location) => boolean;
};

export const Category = styled(ListItem)<CategoryType>`
  margin: 0 2px;
  padding: 6px 0;
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  transition: all 0.3s ease-in-out;

  ${props => props.theme.breakpoints.down('md')} {
    margin: 0;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    display: block;
    margin-left: 0;
    margin-right: 2px;
    padding: 12px 0 12px 42px;
  }

  span {
    position: relative;
    display: flex;
    align-items: center;
    color: ${props => props.theme.sidebar.text.primary};
    white-space: nowrap;
    transition: all 0.5s ease;

    &:before {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${props => props.theme.sidebar.menu.active};
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
    transform: translateX(2px);
  }

  .menu-text {
    svg {
      color: ${props => props.theme.sidebar.menu.default};
      fill: ${props => props.theme.sidebar.menu.default};
      opacity: 1;
    }

    &.active-submenu,
    &:hover {
      span {
        color: ${props => props.theme.sidebar.menu.active};

        &:before {
          transform: scaleX(1);
          transform-origin: 0 50%;
        }

        svg {
          color: ${props => props.theme.sidebar.menu.active};
          fill: ${props => props.theme.sidebar.menu.active};
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

    span {
      color: ${props => props.theme.sidebar.menu.active};
    }
  }

  &.${props => props.activeClassName} {
    .menu-text {
      span {
        color: ${props => props.theme.sidebar.menu.active};

        &:before {
          transform: scaleX(1);
          transform-origin: 0 50%;
        }
      }
    }
  }

  .submenu {
    display: block;
    padding: 5px 30px;

    ${props => props.theme.breakpoints.down('sm')} {
      margin-top: 4px;
      margin-left: 10px;
      padding-left: 5px;
    }

    ${props => props.theme.breakpoints.up('md')} {
      position: absolute;
      top: 42px;
      left: 50%;
      background: ${props => props.theme.sidebar.menu.subMenu.background};
      transform: translateX(-50%);
      box-shadow: 1px 2px 40px 0 rgb(0 0 0 / 9%);
      border-radius: 8px;
    }

    span {
      color: ${props => props.theme.sidebar.menu.default};
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    &.MuiListItem-root {
      padding: 10px 12px;
      border-radius: 4px;

      &:hover,
      &.${props => props.activeClassName} {
        background-color: ${props => props.theme.table.odd};

        .menu-text,
        .sub-menu {
          span {
            &:before {
              display: none;
            }

            svg {
              fill: ${props => props.theme.sidebar.menu.active};
            }
          }
        }
      }

      &.has-sub {
        padding: 0;
        border-radius: 0;
      }

      .menu-text {
        &.sub-menu {
          padding: 10px 12px;
          border-radius: 4px;
          transition: all 0.3s ease-in-out;

          span {
            &,
            & svg {
              transition: all 0.3s ease-in-out;
            }
          }

          &.active-submenu {
            background-color: ${props => props.theme.table.odd};

            svg {
              fill: ${props => props.theme.sidebar.menu.active};
            }
          }

          &.opened {
            background: ${props => props.theme.sidebar.menu.toggle.switch};
            border-radius: 4px 4px 0 0;

            span {
              color: #fff;
              transition: all 0.3s ease-in-out;

              svg {
                fill: #fff;
                transition: all 0.3s ease-in-out;
              }
            }
          }
        }

        &.active-submenu,
        &:hover {
          span {
            &:before {
              display: none;
            }
          }
        }
      }

      .submenu {
        margin: 0;
        background-color: ${props => props.theme.table.odd};
        border-radius: 0 0 4px 4px;
      }
    }
  }
`;

export const CategoryText = styled(ListItemText)`
  margin: 0;

  span {
    color: ${props => props.theme.sidebar.menu.default};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    margin: 0 11px;
    padding: 0;

    ${props => props.theme.breakpoints.up('lg')} {
      margin: 0 16px;
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    span {
      margin: 0;

      svg {
        margin-right: 17px;
      }
    }
  }
`;

export const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};

  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const CategoryIconRemoveIcon = styled(RemoveIcon)`
  display: none;

  ${props => props.theme.breakpoints.down('sm')} {
    display: inline-block;

    color: ${props => rgba(props.theme.sidebar.color, 0.5)};
    &.MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      margin-left: auto;
      margin-right: 0;
    }
  }
`;

export const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};

  ${props => props.theme.breakpoints.down('sm')} {
    &.MuiSvgIcon-root {
      display: none;
    }
  }
`;

export const CategoryIconAddIcon = styled(AddIcon)`
  display: none;

  ${props => props.theme.breakpoints.down('sm')} {
    display: inline-block;
    color: ${props => rgba(props.theme.sidebar.color, 0.5)};

    &.MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      margin-left: auto;
      margin-right: 0;
    }
  }
`;

export const Link = styled(ListItem)<{
  activeClassName: string;
  component: typeof NavLink;
  exact: boolean;
  to: string;
}>`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;

  ${props => props.theme.breakpoints.down('sm')} {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  span {
    transition: all 0.5s ease;
  }

  &:hover {
    background-color: transparent;

    span {
      color: ${props => props.theme.sidebar.menu.active};
    }
  }

  &.${props => props.activeClassName} {
    background-color: transparent;

    span {
      color: ${props => props.theme.sidebar.menu.active};
    }
  }
`;

export const NavLinkStyle = styled(NavLink)`
  display: block;
  padding: 12px 16px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  text-decoration: none;

  ${props => props.theme.breakpoints.down('sm')} {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  span {
    transition: all 0.5s ease;
  }

  &:hover,
  &.active {
    background-color: transparent;

    span {
      color: ${props => props.theme.sidebar.menu.active};
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

export const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px ${props => props.theme.spacing(7)}px
    ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

export const SlideLogoMobileWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 10px 0 20px;
  align-items: center;
  justify-content: space-between;

  .MuiButtonBase-root {
    text-align: left;
  }

  .MuiButtonBase-root {
    position: relative;
    top: unset;
    right: unset;
    justify-content: flex-start;
    margin-right: 0;
    margin-left: 14px;
    font-size: 32px;
  }
`;
