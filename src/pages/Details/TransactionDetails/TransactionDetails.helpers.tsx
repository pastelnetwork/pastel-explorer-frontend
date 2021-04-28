import { Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { HeaderType } from '@components/Table/Table';

import { IBlock } from '@utils/types/IBlocks';
import { ITransactionDetails } from '@utils/types/ITransactions';
import { formattedDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

import * as Styles from './TransactionDetails.styles';

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Confirmations' },
  { id: 2, header: 'Block Hash' },
  { id: 3, header: 'Timestamp' },
];

export const inputAddressHeaders: Array<HeaderType> = [
  { id: 1, header: 'Address' },
  { id: 2, header: 'Amount (PSL)' },
];

export const recipientsHeaders: Array<HeaderType> = [
  { id: 1, header: 'Address' },
  { id: 2, header: 'Amount (PSL)' },
];

export const generateTableTitle = (transactionData: ITransactionDetails, block: IBlock | null) => {
  return (
    <Alert severity="info">
      <AlertTitle>PSL ID: {transactionData.id}</AlertTitle>
      {`This transaction was first broadcast to the PSL network on 
      ${formattedDate(transactionData.timestamp)}. 
      The transaction is currently 
      ${block && block.transactionCount > 6 ? 'confirmed' : 'unconfirmed'} by the network.
      At the time of this transaction 
      ${formatNumber(transactionData.totalAmount, { decimalsLength: 2 })} 
      PSL was sent.`}
    </Alert>
  );
};

export const generateNonStandardTransactionInfo = () => (
  <Grid item xs={12}>
    <Styles.Alert severity="info">
      <AlertTitle>NONSTANDARD TX</AlertTitle>
    </Styles.Alert>
  </Grid>
);
