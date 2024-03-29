import { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { H } from 'highlight.run';
import jssPreset from 'jss-preset-default';
import { ThemeProvider } from 'styled-components';
import { create } from 'jss';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';

import ErrorHandler from '@pages/ErrorHandler/ErrorHandler';
import ResponseErrorAlert from '@components/ResponseErrorAlert/ResponseErrorAlert';
import InfoDrawer from '@components/InfoDrawer/InfoDrawer';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { setAppThemeAction } from '@redux/actions/appThemeAction';
import { setApiHostingAction } from '@redux/actions/clusterAction';
import { AppDispatchType } from '@redux/store';
import { socket, SocketContext } from '@context/socket';
import { DEFAULT_CURRENCY } from '@utils/appInfo';
import {
  BASE_URL,
  BASE_URL_TESTNET,
  BASE_URL_DEVNET,
  DEFAULT_API_URL,
} from '@utils/constants/urls';

import { ReactComponent as PastelLogo } from '@assets/images/pastel-logo.svg';
import { themeLight, themeDark } from './theme';
import Routes from './routes/Routes';
import * as Styles from './App.styles';

import './global.styles.css';

H.init(process.env.REACT_APP_EXPLORER_HIGHLIGHT_PROJECT_ID, {
  tracingOrigins: true,
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // insert full or partial urls that you don't want to record here
      // Out of the box, Highlight will not record these URLs (they can be safely removed):
      'https://fonts.googleapis.com',
    ],
  },
});

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point') as HTMLElement,
});

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const [succeed, setSucceed] = useState<boolean>(false);
  useEffect(() => {
    const isDarkModeInit = localStorage.getItem('darkMode') === 'true';
    dispatch(setAppThemeAction(isDarkModeInit));
    setSucceed(true);
  }, [dispatch]);

  useEffect(() => {
    const persist = localStorage.getItem('persist:root');
    const url = DEFAULT_API_URL || BASE_URL || BASE_URL_TESTNET || BASE_URL_DEVNET;
    if (persist) {
      const store = JSON.parse(persist);
      const tmp = JSON.parse(store.cluster);
      if (tmp.url) {
        if (tmp.url !== BASE_URL && tmp.url !== BASE_URL_TESTNET && tmp.url !== BASE_URL_DEVNET) {
          localStorage.removeItem('persist:root');
          dispatch(setApiHostingAction(url as string, DEFAULT_CURRENCY));
          window.location.reload();
        }
      } else {
        localStorage.removeItem('persist:root');
        dispatch(setApiHostingAction(url as string, DEFAULT_CURRENCY));
        window.location.reload();
      }
    } else {
      dispatch(setApiHostingAction(url as string, DEFAULT_CURRENCY));
    }
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
        <StyledEngineProvider injectFirst>
          <StylesProvider jss={jss}>
            <MuiThemeProvider theme={isDarkMode ? themeDark : themeLight}>
              <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
                <ErrorHandler>
                  <Routes />
                  <ResponseErrorAlert />
                </ErrorHandler>
                <InfoDrawer />
              </ThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
        </StyledEngineProvider>
      </SocketContext.Provider>
    </HelmetProvider>
  );
};

export default App;
