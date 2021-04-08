import { createMuiTheme } from '@material-ui/core/styles';

import colors from './colors';

const { primary, secondary } = colors;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary.light,
      main: primary.main,
      dark: primary.dark,
    },
    secondary: {
      light: secondary.light,
      main: secondary.main,
      dark: secondary.dark,
    },
  },
});

export default theme;
