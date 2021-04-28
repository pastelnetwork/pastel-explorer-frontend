import styled from 'styled-components/macro';

import { Typography as MuiTypography } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: ${themeVariant.footer.background};
  box-shadow: -1px 7px 12px 0px ${themeVariant.footer.color};
  z-index: 99;
`;

export const Typography = styled(MuiTypography)`
  font-size: 1.25rem;
  color: ${themeVariant.footer.color};
`;
