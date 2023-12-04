import { createTheme as createMuiTheme, Theme } from '@mui/material/styles';
import themeVariant from './variants';
import typography from './typography';
import overrides from './overrides';
import breakpoints from './breakpoints';
import shadows from './shadows';

const createTheme = (): Theme => {
  return createMuiTheme(
    {
      spacing: 4,
      breakpoints,
      components: overrides,
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
    components: overrides,
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
      menu: {
        default: '#868f9b',
        active: '#34a1ff',
        background: '#fff',
        hover: '#0062cc',
        subMenu: {
          background: '#fff',
        },
        toggle: {
          background: '#E9F2FB',
          switch: '#34a1ff',
          hover: '#0E80F5',
          period: '#868f9b',
        },
        border: '#2D3748',
        mobile: {
          border: '#e6e6e6',
          borderTop: '#e6e6e6',
        },
      },
    },
    scrollbar: '#7d7d7e',
    link: {
      main: '#3F9AF7',
      hover: '#0E80F5',
      pressed: '#0971DC',
      shareIcon: 'transparent',
    },
    table: {
      header: '#fff',
      odd: '#ECEFF3',
      even: '#FCFCFD',
      hover: '#EBEAEA',
      label: '#2D3748',
      oddSupernode: '#ECEFF3',
    },
    filter: {
      border: 'rgba(0, 0, 0, 0.12)',
      background: '#B9BFCB',
      footer: 'linear-gradient(270deg, rgb(210, 226, 255) 0%, rgb(234, 244, 255) 100%)',
      group: '#FAFBFC',
      text: '#2D3748',
    },
    card: {
      color: '#4A5568',
      titleColor: '#EBEAEA',
      border: {
        default: 'rgba(0, 0, 0, 0.23)',
        active: 'rgba(39, 153, 137, 0.5)',
        changeTheme: '#00B282',
      },
      text: {
        default: '#2D3748',
        active: '#279989',
      },
      richlist: {
        background: '#FCFCFD',
        border: '#ECEFF3',
      },
      item: {
        background: '#fff',
        border: '#ECEFF3',
        titleBackground: '#F6F7F9',
      },
    },
    crown: {
      gold: '#D69B00',
      silver: '#A5A195',
      bronze: '#AD4005',
    },
    supernodes: {
      status: {
        background: {
          enabled: '#00D097',
          newStart: '#FFA21B',
          expired: '#fe634c',
        },
        color: '#fff',
      },
      table: {
        active: '#ebeaea',
        even: '#e0e0e0',
      },
    },
    dropdown: {
      border: '#A0AEC0',
      color: '#4A5568',
    },
    nft: {
      secondary: '#00ACB1',
      accent: '#1B1D21',
      primaryCustom: {
        200: 'rgba(0, 172, 177, 0.1)',
      },
      grey: {
        100: '#F7F7F7',
        300: '#C4C4C4',
        800: '#2D3748',
      },
    },
    sense: {
      overlay: 'rgb(255 255 255 / 20%)',
    },
  },
);

export const themeDark = createMuiTheme(
  {
    palette: {
      ...themeVariant.palette,
      background: {
        default: '#232630',
        paper: '#0d0d0d',
      },
      text: {
        primary: '#F8F8FA',
        secondary: '#F8F8FA',
      },
    },
    spacing: 4,
    breakpoints,
    components: overrides,
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
      menu: {
        default: '#A0AEC0',
        active: '#00D097',
        background: '#2D3748',
        hover: '#00D097',
        subMenu: {
          background: '#2D3748',
        },
        toggle: {
          background: '#1d1e31',
          switch: '#00D097',
          hover: '#00D097',
          period: '#4A5568',
        },
        border: '#FCFCFD',
        mobile: {
          border: '#e6e6e6',
          borderTop: '#7773bd',
        },
      },
    },
    scrollbar: '#8894AA',
    link: {
      main: '#00D097',
      hover: '#00C28D',
      pressed: '#00B282',
      shareIcon: '#FCFCFD',
    },
    table: {
      header: '#4A5568',
      odd: '#2D3748',
      even: '#4A5568',
      hover: '#718096',
      label: '#F8F8FA',
      oddSupernode: '#1A202C',
    },
    filter: {
      border: 'rgb(35, 38, 48)',
      background: 'rgb(35, 38, 48)',
      footer: '#00d0978f',
      group: '#434a52',
      text: '#A0AEC0',
    },
    card: {
      color: '#fff',
      titleColor: '#1A202C',
      border: {
        default: '#4A5568',
        active: 'rgba(39, 153, 137, 0.5)',
        changeTheme: '#0971DC',
      },
      text: {
        default: '#F8F8FA',
        active: '#279989',
      },
      richlist: {
        background: '#4A5568',
        border: '#2D3748',
      },
      item: {
        background: '#4A5568',
        border: '#2D3748',
        titleBackground: '#2D3748',
      },
    },
    crown: {
      gold: '#D69B00',
      silver: '#A5A195',
      bronze: '#AD4005',
    },
    supernodes: {
      status: {
        background: {
          enabled: '#0971DC',
          newStart: '#E88A00',
        },
        color: '#fff',
      },
      table: {
        active: '#1a202c',
        even: '#292e36',
      },
    },
    dropdown: {
      border: '#A0AEC0',
      color: '#F8F9FA',
    },
    nft: {
      secondary: '#00C28D',
      accent: '#1B1D21',
      primaryCustom: {
        200: '#e8f4fd',
      },
      grey: {
        100: '#A0AEC0',
        300: '#C4C4C4',
        800: '#F8F8FA',
      },
    },
    sense: {
      overlay: 'rgb(0 0 0 / 20%)',
    },
  },
);

export default createTheme;

export type TAppTheme = typeof themeDark;
