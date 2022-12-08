import * as React from 'react';
import { Typography, Dialog, AppBar, IconButton, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

import { ITicket } from '@utils/types/ITransactions';

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
  toggleOpen: () => void;
  tickets: ITicket[];
}

const TransactionRawData: React.FC<ITransactionRawDataProps> = ({
  rawData,
  open,
  toggleOpen,
  tickets,
}) => {
  const classes = Styles.useStyles();

  const getTickets = () => {
    return tickets.map(ticket => ({
      ...ticket.data.ticket,
      txid: ticket.transactionHash,
    }));
  };

  return (
    <Dialog fullScreen open={open} onClose={toggleOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Styles.TransactionRawDataToolbar>
          <IconButton edge="start" color="inherit" onClick={toggleOpen} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Transaction Raw Data
          </Typography>
        </Styles.TransactionRawDataToolbar>
      </AppBar>
      {rawData ? (
        <Styles.TransactionRawData>
          <code>{JSON.stringify({ ...JSON.parse(rawData), tickets: getTickets() }, null, 2)}</code>
        </Styles.TransactionRawData>
      ) : (
        'No data'
      )}
    </Dialog>
  );
};

export default TransactionRawData;
