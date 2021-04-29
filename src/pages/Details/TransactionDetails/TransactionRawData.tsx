import * as React from 'react';
import { Typography, Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

import * as Styles from './TransactionDetails.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

interface ITransactionRawDataProps {
  rawData: string;
  open: boolean;
  toogleOpen: () => void;
}

const TransactionRawData: React.FC<ITransactionRawDataProps> = ({ rawData, open, toogleOpen }) => {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={open} onClose={toogleOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toogleOpen} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Transaction Raw Data
          </Typography>
        </Toolbar>
      </AppBar>
      {rawData ? (
        <Styles.TransactionRawData>
          <code>{JSON.stringify(JSON.parse(rawData), null, 2)}</code>
        </Styles.TransactionRawData>
      ) : (
        'No data'
      )}
    </Dialog>
  );
};

export default TransactionRawData;
