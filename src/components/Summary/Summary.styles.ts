import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '20px 0',
    },
    card: {
      minWidth: 300,
    },
    header: {
      textAlign: 'center',
      backgroundColor: '#e3e3e3',
    },
    content: {
      textAlign: 'center',
    },
  }),
);
