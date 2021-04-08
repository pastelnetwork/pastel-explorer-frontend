import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '100px 0',
    },
    card: {
      minWidth: 300,
    },
    header: {
      textAlign: 'center',
      backgroundColor: theme.palette.primary.light,
    },
    content: {
      textAlign: 'center',
    },
  }),
);
