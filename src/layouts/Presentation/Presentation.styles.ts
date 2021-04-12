import styled, { createGlobalStyle } from 'styled-components/macro';

import { GlobalStyleProps } from '@utils/types/styles';

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${props => props.theme.palette.background.default};
  }
`;

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
