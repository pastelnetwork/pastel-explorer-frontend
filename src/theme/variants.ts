import { green, grey } from '@material-ui/core/colors';

const themeVariant = {
  palette: {
    primary: {
      main: '#279989',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#41B6E6',
      contrastText: '#FFF',
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFF',
    },
    text: {
      primary: '#27251F',
    },
  },
  header: {
    color: grey[500],
    background: '#FFF',
    search: {
      color: grey[900],
    },
    indicator: {
      background: '#41B6E6',
    },
  },
  footer: {
    color: grey[500],
    background: '#FFF',
  },
  sidebar: {
    color: grey[200],
    background: '#233044',
    header: {
      color: grey[200],
      background: '#233044',
      brand: {
        color: '#41B6E6',
      },
    },
    footer: {
      color: grey[200],
      background: '#1E2A38',
      online: {
        background: green[500],
      },
    },
    badge: {
      color: '#FFF',
      background: '#41B6E6',
    },
  },
};

export default themeVariant;
