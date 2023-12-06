import styled, { createGlobalStyle } from 'styled-components';
import { Paper as MuiPaper } from '@mui/material';

export const drawerWidth = 258;

export const GlobalStyle = createGlobalStyle`
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

  .MuiGrid-root.MuiGrid-container {
    width: calc(100% + 12px);
    margin: -6px;
  }

  .MuiGrid-spacing-xs-3 > .MuiGrid-item,
  .MuiGrid-spacing-xs-6 > .MuiGrid-item {
    padding: 6px;
  }

  .max-w-355 {
    max-width: 335px;
  }

  .space-nowrap {
    white-space: nowrap;
  }
`;

export const Root = styled.div`
  display: block;
  min-height: 100vh;
`;

export const Paper = styled(MuiPaper);

export const MainWrapper = styled.main`
  min-height: auto;
`;

export const MainContent = styled(MuiPaper)`
  padding: 0 12px 20px;
  flex: 1;
  background: ${props => props.theme.palette.background.paper};
  min-height: 65vh;

  &.fluid {
    padding: 0;
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

export const EmptySection = styled.div`
  display: block;
  width: 100%;
  height: 20px;
  background: ${props => props.theme.palette.background.paper};

  &.hidden {
    display: none;
  }
`;
