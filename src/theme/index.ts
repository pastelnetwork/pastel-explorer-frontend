import { createMuiTheme, Theme } from '@material-ui/core/styles';
import themeVariant from './variants';
import typography from './typography';
import overrides from './overrides';
import breakpoints from './breakpoints';
import props from './props';
import shadows from './shadows';

const createTheme = (): Theme => {
  return createMuiTheme(
    {
      spacing: 4,
      breakpoints,
      overrides,
      props,
      typography,
      shadows,
      palette: themeVariant.palette,
    },
    {
      header: themeVariant.header,
      footer: themeVariant.footer,
      sidebar: themeVariant.sidebar,
    },
  );
};

export default createTheme;
