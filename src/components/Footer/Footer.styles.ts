import styled from 'styled-components';

import { Typography as MuiTypography, Grid } from '@mui/material';

import themeVariant from '@theme/variants';

export const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 30px 16px 15px;
  background: ${props => props.theme.palette.background.default};
  box-shadow: -1px 7px 12px 0px ${themeVariant.footer.color};
  z-index: 99;

  ${props => props.theme.breakpoints.down('xs')} {
    display: block;
    padding-top: 15px;
    padding-bottom: 15px;
  }
`;

export const Typography = styled(MuiTypography)`
  font-size: 1rem;
  color: ${props => props.theme.sidebar.menu.default};

  ${props => props.theme.breakpoints.down('xs')} {
    text-align: center;
  }
`;

export const FooterMenuWrapper = styled.div`
  display: flex;

  ${props => props.theme.breakpoints.down('xs')} {
    justify-content: center;
  }
`;

export const FooterMenuBlock = styled.div`
  margin-right: 55px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    margin-right: 78px;
  }
`;

export const FooterMenuTitle = styled.h5`
  margin: 0;
  font-weight: 700;
  font-size: 16px;
`;

export const FooterMenuList = styled.ul`
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
`;

export const FooterMenuItem = styled.li`
  margin: 6px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FooterMenuLink = styled.a`
  color: ${props => props.theme.sidebar.menu.default};
  font-size: 14px;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    color: ${props => props.theme.sidebar.menu.active};
  }
`;

export const GridStyle = styled(Grid)`
  margin-top: 15px;
`;
