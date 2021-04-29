import * as React from 'react';
import { Typography, Dialog, AppBar, IconButton, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

import * as Styles from './TransactionDetails.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ITransactionRawDataProps {
  rawData: string;
  open: boolean;
  toogleOpen: () => void;
}

const TransactionRawData: React.FC<ITransactionRawDataProps> = ({ rawData, open, toogleOpen }) => {
  const classes = Styles.useStyles();

  return (
    <Dialog fullScreen open={open} onClose={toogleOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Styles.TransactionRawDataToolbar>
          <IconButton edge="start" color="inherit" onClick={toogleOpen} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Transaction Raw Data
          </Typography>
        </Styles.TransactionRawDataToolbar>
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
