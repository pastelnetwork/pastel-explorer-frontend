import { useEffect, useState } from 'react';
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

import ErrorHandler from '@pages/ErrorHandler/ErrorHandler';
import ResponseErrorAlert from '@components/ResponseErrorAlert/ResponseErrorAlert';
import InfoDrawer from '@components/InfoDrawer/InfoDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { setAppThemeAction } from '@redux/actions/appThemeAction';

import { themeLight, themeDark } from './theme';
import Routes from './routes/Routes';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point') as HTMLElement,
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [succeed, setSucceed] = useState<boolean>(false);
  useEffect(() => {
    const isDarkModeInit = localStorage.getItem('darkMode') === 'true';
    dispatch(setAppThemeAction(isDarkModeInit));
    setSucceed(true);
  }, [dispatch]);
  const isDarkMode = useSelector(getThemeState).darkMode;
  if (!succeed) {
    return <div>Loading...</div>;
  }
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pastel Explorer" defaultTitle="Pastel Explorer" />
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={isDarkMode ? themeDark : themeLight}>
            <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
              <ErrorHandler>
                <Routes />
                <ResponseErrorAlert />
              </ErrorHandler>
              <InfoDrawer />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </HelmetProvider>
  );
};

export default App;
