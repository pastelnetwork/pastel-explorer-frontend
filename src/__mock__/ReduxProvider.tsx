import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { themeLight } from '../theme';

interface IReduxProvider {
  children: React.ReactNode;
  // eslint-disable-next-line
  store: any;
}

const ReduxProvider: React.FC<IReduxProvider> = ({ children, store }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={themeLight}>
        <ThemeProvider theme={themeLight}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
