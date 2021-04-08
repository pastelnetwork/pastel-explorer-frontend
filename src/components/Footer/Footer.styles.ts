import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      height: 50,
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
    },
    logo: {
      height: 20,
    },
  }),
);
