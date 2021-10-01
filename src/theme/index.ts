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
      closeIcon: '#000',
    },
    scrollbar: '#7d7d7e',
    link: {
      main: '#3F9AF7',
      hover: '#0E80F5',
      pressed: '#0971DC',
    },
    filter: {
      border: 'rgba(0, 0, 0, 0.12)',
      background: 'rgba(45, 55, 72, 0.04)',
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
      closeIcon: '#fff',
    },
    scrollbar: '#0a0b0e',
    link: {
      main: '#3F9AF7',
      hover: '#0E80F5',
      pressed: '#0971DC',
    },
    filter: {
      border: 'rgb(35, 38, 48)',
      background: 'rgb(35, 38, 48)',
    },
  },
);

export default createTheme;

export type TAppTheme = typeof themeDark;
