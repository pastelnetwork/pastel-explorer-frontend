import * as React from 'react';
import { Typography, Dialog, AppBar, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import parse from 'html-react-parser';

import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './TransactionDetails.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ITransactionRawDataProps {
  rawData: string;
  open: boolean;
  toggleOpen: () => void;
  tickets: ITicket[];
  senses: TSenseRequests[];
}

const TransactionRawData: React.FC<ITransactionRawDataProps> = ({
  rawData,
  open,
  toggleOpen,
  tickets,
  senses,
}) => {
  const classes = Styles.useStyles();

  const getTickets = () => {
    return tickets.map(ticket => ({
      ...ticket.data.ticket,
      txid: ticket.transactionHash,
    }));
  };

  const getSenses = () => {
    return senses.map(sense => {
      const parseSenseData = JSON.parse(sense.rawData);
      return {
        ...parseSenseData,
        raw_dd_service_data_json: parseSenseData?.raw_dd_service_data_json
          ? JSON.parse(parseSenseData.raw_dd_service_data_json)
          : null,
      };
    });
  };

  return (
    <Dialog fullScreen open={open} onClose={toggleOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Styles.TransactionRawDataToolbar>
          <IconButton edge="start" color="inherit" onClick={toggleOpen} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {parse(translate('pages.transactionDetails.transactionRawData'))}
          </Typography>
        </Styles.TransactionRawDataToolbar>
      </AppBar>
      {rawData ? (
        <Styles.TransactionRawData>
          <code>
            {JSON.stringify(
              {
                ...JSON.parse(rawData),
                tickets: tickets.length ? getTickets() : undefined,
                senses: senses.length ? getSenses() : undefined,
              },
              null,
              2,
            )}
          </code>
        </Styles.TransactionRawData>
      ) : (
        parse(translate('common.noData'))
      )}
    </Dialog>
  );
};

export default TransactionRawData;
