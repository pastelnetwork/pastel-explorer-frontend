import { ThemeProvider } from 'styled-components/macro';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { RouteType } from '@utils/types/routes';

import createTheme from '@theme/index';

import * as Styles from './Presentation.styles';

interface PresentationPropsType {
  routes: Array<RouteType>;
}

const Presentation: React.FC<PresentationPropsType> = ({ children }) => {
  return (
    <MuiThemeProvider theme={createTheme()}>
      <ThemeProvider theme={createTheme()}>
        <Styles.Root>
          <CssBaseline />
          <Styles.GlobalStyle />
          <Styles.AppContent>{children}</Styles.AppContent>
        </Styles.Root>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Presentation;
