import GillSansRegular from '@assets/fonts/Gill-Sans.woff2';

const overrides = {
  MuiCssBaseline: {
    styleOverrides: `
      @font-face {
        font-family: 'Gill Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Gill Sans'), url(${GillSansRegular}) format('woff2');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
    `,
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        boxShadow: 'rgba(50, 50, 93, 0.025) 0px 2px 5px -1px, rgba(0, 0, 0, 0.05) 0px 1px 3px -1px',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      action: {
        marginTop: '-4px',
        marginRight: '-4px',
      },
    },
    titleTypographyProps: {
      variant: 'h6',
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      day: {
        fontWeight: '300',
      },
    },
  },
  MuiPickersYear: {
    styleOverrides: {
      root: {
        height: '64px',
      },
    },
  },
  MuiPickersCalendar: {
    styleOverrides: {
      transitionContainer: {
        marginTop: '6px',
      },
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      iconButton: {
        backgroundColor: 'transparent',
        '& > *': {
          backgroundColor: 'transparent',
        },
      },
      switchHeader: {
        marginTop: '2px',
        marginBottom: '4px',
      },
    },
  },
  MuiPickersClock: {
    styleOverrides: {
      container: {
        margin: `32px 0 4px`,
      },
    },
  },
  MuiPickersClockNumber: {
    styleOverrides: {
      clockNumber: {
        left: `calc(50% - 16px)`,
        width: '32px',
        height: '32px',
      },
    },
  },
  MuiPickerDTHeader: {
    styleOverrides: {
      dateHeader: {
        '& h4': {
          fontSize: '2.125rem',
          fontWeight: 400,
        },
      },
      timeHeader: {
        '& h3': {
          fontSize: '3rem',
          fontWeight: 400,
        },
      },
    },
  },
  MuiPickersTimePicker: {
    styleOverrides: {
      hourMinuteLabel: {
        '& h2': {
          fontSize: '3.75rem',
          fontWeight: 300,
        },
      },
    },
  },
  MuiPickersToolbar: {
    styleOverrides: {
      toolbar: {
        '& h4': {
          fontSize: '2.125rem',
          fontWeight: 400,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
};

export default overrides;
