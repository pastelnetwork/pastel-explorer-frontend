import styled from 'styled-components/macro';

import { darken, Grid as MuiGrid } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const Grid = styled(MuiGrid)`
  position: relative;
`;

export const ZoomContainer = styled.div`
  display: none !important;
  position: absolute;
  display: flex;
  align-items: baseline;
  top: 45px;
  left: 15px;
`;

export const ZoomElement = styled.div`
  cursor: pointer;
  border: 1px solid ${themeVariant.palette.text};
  border-radius: 3px;
  background-color: ${themeVariant.palette.background.default};
  padding: 2px 0;
  font-size: 0.8rem;
  transition: all 0.2s ease-in;
  margin: 0 3px;
  width: 40px;
  text-align: center;

  &:hover {
    background-color: ${darken(themeVariant.palette.background.paper, 0.1)};
  }
`;
