import { makeStyles } from '@mui/styles';
import { TAppTheme } from '@theme/index';

export const eChartLineStyles = makeStyles((theme: TAppTheme) => ({
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#3F9AF7',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Gill Sans',
    padding: '8px 24px',
    borderRadius: '16px',
    marginLeft: '8px',
    marginRight: '8px',
    border: '1px solid #3F9AF7',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#0E80F5',
      borderColor: '#0E80F5',
    },
    '&:active': {
      backgroundColor: '#0971DC',
      borderColor: '#0971DC',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '4px 20px',
      fontSize: '12px',
    },
  },
  reactECharts: {
    width: '100%',
    height: 'calc(100vh - 300px) !important',
    [theme.breakpoints.down('sm')]: {
      height: 'auto !important',
    },
  },
  lineChartDownloadButtonBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      justifyContent: 'center',
    },
  },
  lineChartThemeSelect: {
    display: 'flex',
    minWidth: '130px',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  themeSelectButton: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
  },
  filterButton: {
    backgroundColor: '#eee',
    color: '#212124',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '3px',
    borderWidth: '1px',
    borderColor: '#212124',
    marginLeft: '4px',
    marginRight: '4px',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.8',
    },
  },
}));
