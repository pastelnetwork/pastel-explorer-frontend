import { darken } from 'polished';
import { green, grey, red, orange } from '@material-ui/core/colors';

const themeVariant = {
  custom: {
    black: '#000',
    white: '#fff',
    blue: {
      blackRock: '#232630',
      solitude: '#F8F8FA',
      licorice: '#2D3748',
      slateBlue: '#6151d0',
    },
    green: {
      light: green[200],
      main: green[500],
      dark: green[800],
      success: '#00D097',
    },
    red: {
      light: red[200],
      main: red[500],
      dark: red[800],
      error: '#FE634C',
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
      default: '#EFEDEA',
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
    background: '#D7D2CB',
    supernode: '#000',
    peer: '#279989',
  },
  footer: {
    color: grey[500],
    background: '#FFF',
  },
  sidebar: {
    color: grey[200],
    background: '#27251F',
    header: {
      color: grey[200],
      background: '#27251F',
      brand: {
        color: '#41B6E6',
      },
    },
    footer: {
      color: grey[200],
      background: darken(0.03, '#27251F'),
    },
    badge: {
      color: '#FFF',
      background: '#41B6E6',
    },
    chart: {
      light: '#2D3748',
      dark: '#A0AEC0',
      label: {
        dark: '#fff',
        light: '#1A202C',
      },
    },
  },
};

export default themeVariant;
