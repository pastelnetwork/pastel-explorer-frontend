import * as React from 'react';
import { Typography, Dialog, AppBar, IconButton, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

import * as Styles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ISenseRawDataProps {
  rawData: string;
  open: boolean;
  toggleOpen: () => void;
}

const SenseRawData: React.FC<ISenseRawDataProps> = ({ rawData, open, toggleOpen }) => {
  const classes = Styles.useStyles();
  return (
    <Dialog fullScreen open={open} onClose={toggleOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Styles.TransactionRawDataToolbar>
          <IconButton edge="start" color="inherit" onClick={toggleOpen} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sense Raw Data
          </Typography>
        </Styles.TransactionRawDataToolbar>
      </AppBar>
      {rawData ? (
        <Styles.TransactionRawData>
          <code>{JSON.stringify(JSON.parse(JSON.parse(rawData)), null, 2)}</code>
        </Styles.TransactionRawData>
      ) : (
        'No data'
      )}
    </Dialog>
  );
};

export default SenseRawData;