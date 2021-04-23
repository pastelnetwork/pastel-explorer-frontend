import { fade } from '@material-ui/core/styles/colorManipulator';
import { green, grey, red, orange } from '@material-ui/core/colors';

const themeVariant = {
  custom: {
    green: {
      light: green[200],
      main: green[500],
      dark: green[800],
    },
    red: {
      light: red[200],
      main: red[500],
      dark: red[800],
    },
    orange: {
      light: orange[200],
      main: orange[500],
      dark: orange[800],
    },
  },
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
    color: grey[800],
    background: '#FFF',
    search: {
      color: grey[900],
    },
    indicator: {
      background: '#41B6E6',
    },
  },
  map: {
    background: '#e3eaef',
    masternode: fade('#000', 0.5),
    peer: fade('#279989', 0.5),
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
