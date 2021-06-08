import { Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { HeaderType } from '@components/Table/Table';

import { ITransactionDetails } from '@utils/types/ITransactions';
import { formattedDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

import * as Styles from './TransactionDetails.styles';

const BLOCK_CONFIRMED_NUMBER = 6;

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Confirmations' },
  { id: 2, header: 'Block Hash' },
  { id: 3, header: 'Timestamp' },
];

export const addressHeaders: Array<HeaderType> = [
  { id: 1, header: 'Address' },
  { id: 2, header: 'Amount (PSL)' },
  { id: 3, header: 'Amount (USD)' },
];

export const generateTableTitle = (transactionData: ITransactionDetails) => (
  <Alert severity="info">
    <AlertTitle style={{ wordBreak: 'break-word' }}>PSL ID: {transactionData.id}</AlertTitle>
    {`This transaction was first broadcast to the PSL network on 
      ${formattedDate(transactionData.timestamp)}. 
      The transaction is currently 
      ${
        transactionData.block.confirmations > BLOCK_CONFIRMED_NUMBER ? 'confirmed' : 'unconfirmed'
      } by the network.
      At the time of this transaction 
      ${formatNumber(transactionData.totalAmount, { decimalsLength: 2 })} 
      PSL was sent.`}
  </Alert>
);

export const generateCoinbaseInfo = (info: number) => (
  <Alert severity="info">
    <AlertTitle>New coins ({formatNumber(info, { decimalsLength: 2 })})</AlertTitle>
  </Alert>
);

export const generateNonStandardTransactionInfo = () => (
  <Grid item xs={12}>
    <Styles.Alert severity="info">
      <AlertTitle>NONSTANDARD TX</AlertTitle>
    </Styles.Alert>
  </Grid>
);
