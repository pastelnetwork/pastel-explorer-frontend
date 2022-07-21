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
import { setApiHostingAction } from '@redux/actions/clusterAction';
import { socket, SocketContext } from '@context/socket';
import { getBaseURL } from '@utils/helpers/useFetch/useFetch';
import { DEFAULT_CURRENCY } from '@utils/appInfo';
import { BASE_URL } from '@utils/constants/urls';

import { ReactComponent as PastelLogo } from '@assets/images/pastel-logo.svg';
import { themeLight, themeDark } from './theme';
import Routes from './routes/Routes';
import * as Styles from './App.styles';

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

  useEffect(() => {
    (async () => {
      try {
        const url = getBaseURL();
        await fetch(url);
      } catch {
        localStorage.removeItem('persist:root');
        dispatch(setApiHostingAction(BASE_URL as string, DEFAULT_CURRENCY));
        window.location.reload();
      }
    })();
  }, []);

  const isDarkMode = useSelector(getThemeState).darkMode;
  if (!succeed) {
    return (
      <Styles.LoadingWrapper>
        <PastelLogo />
      </Styles.LoadingWrapper>
    );
  }
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pastel Explorer" defaultTitle="Pastel Explorer" />
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </HelmetProvider>
  );
};

export default App;
