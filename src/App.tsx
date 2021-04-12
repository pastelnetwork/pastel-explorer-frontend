import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import DateFnsUtils from '@date-io/date-fns';

import { ThemeProvider } from 'styled-components/macro';
import { create } from 'jss';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from '@material-ui/core/styles';

import createTheme from './theme';
import Routes from './routes/Routes';

const jss = create({
  ...jssPreset(),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  insertionPoint: document.getElementById('jss-insertion-point')!,
});

const App: React.FC = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Pastel Explorer" defaultTitle="Pastel Explorer" />
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={createTheme()}>
              <ThemeProvider theme={createTheme()}>
                <Routes />
              </ThemeProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
