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

export const themeLight = createMuiTheme(
  {
    palette: {
      ...themeVariant.palette,
      background: {
        default: '#FFFFFF',
        paper: '#FAFBFC',
      },
      text: {
        primary: '#2D3748',
        secondary: '#4E5D78',
      },
    },
    spacing: 4,
    breakpoints,
    overrides,
    props,
    typography,
    shadows,
  },
  {
    header: themeVariant.header,
    footer: themeVariant.footer,
    sidebar: {
      ...themeVariant.sidebar,
      background: {
        default: '#FFFFFF',
        active: '#6C5DD3',
      },
      text: {
        default: '#FFFFFF',
        active: '#F8F8FA',
        primary: '#4A5568',
      },
      radius: {
        default: 0,
        active: '15px',
      },
    },
  },
);

export const themeDark = createMuiTheme(
  {
    palette: {
      ...themeVariant.palette,
      background: {
        default: '#232630',
        paper: '#14161D',
      },
      text: {
        primary: '#F8F8FA',
        secondary: '#F8F8FA',
      },
    },
    spacing: 4,
    breakpoints,
    overrides,
    props,
    typography,
    shadows,
  },
  {
    header: themeVariant.header,
    footer: themeVariant.footer,
    sidebar: {
      ...themeVariant.sidebar,
      background: {
        default: '#232630',
        active: '#6C5DD3',
      },
      text: {
        default: '#4A5568',
        active: '#F8F8FA',
        primary: '#4A5568',
      },
      radius: {
        default: 0,
        active: '15px',
      },
    },
  },
);

export default createTheme;

export type TAppTheme = typeof themeDark;
