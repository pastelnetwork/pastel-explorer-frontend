import styled from 'styled-components/macro';

import { Typography as MuiTypography } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: ${props => props.theme.palette.background.default};
  box-shadow: -1px 7px 12px 0px ${themeVariant.footer.color};
  z-index: 99;
`;

export const Typography = styled(MuiTypography)`
  font-size: 1rem;
  color: ${themeVariant.footer.color};
`;
