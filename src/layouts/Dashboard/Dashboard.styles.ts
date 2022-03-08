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
  display: block;
  min-height: 100vh;
`;

export const Paper = styled(MuiPaper)(spacing);

export const MainWrapper = styled.main`
  min-height: calc(100vh - 116px);
`;

export const MainContent = styled(Paper)`
  padding: 0 12px 20px;
  flex: 1;
  background: ${props => props.theme.palette.background.paper};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;
