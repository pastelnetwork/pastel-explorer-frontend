import styled, { createGlobalStyle } from 'styled-components/macro';
import { spacing } from '@material-ui/system';
import { Paper as MuiPaper } from '@material-ui/core';

import { GlobalStyleProps } from '@utils/types/styles';

export const drawerWidth = 258;

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Drawer = styled.div`
  ${props => props.theme.breakpoints.up('md')} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

export const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const Paper = styled(MuiPaper)(spacing);

export const MainContent = styled(Paper)`
  padding: 20px;
  flex: 1;
  background: ${props => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;
