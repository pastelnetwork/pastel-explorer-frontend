import { Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { HeaderType } from '@components/Table/Table';

import { ITransactionDetails } from '@utils/types/ITransactions';
import { formattedDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';

import * as Styles from './TransactionDetails.styles';

const BLOCK_CONFIRMED_NUMBER = 1;

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'Block Hash' },
  { id: 2, header: 'Confirmations' },
  { id: 4, header: 'Recipients' },
  { id: 5, header: `Amount (${getCurrencyName()})` },
  { id: 6, header: 'Timestamp' },
];

export const addressHeaders: Array<HeaderType> = [
  { id: 1, header: 'Address', key: 'address' },
  { id: 2, header: `Amount (${getCurrencyName()})`, key: 'amount' },
  { id: 3, header: 'Amount (USD)', key: 'amount' },
];

export const generateTableTitle = (
  transactionData: ITransactionDetails,
  toggleOpenRawData: () => void,
) => (
  <Styles.ViewTransactionRawMuiAlert severity="info">
    <AlertTitle style={{ wordBreak: 'break-word' }}>
      {getCurrencyName()} TXID: {transactionData.id}
      <Styles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
        (View Transaction Raw Data)
      </Styles.ViewTransactionRaw>
    </AlertTitle>
    {`This transaction was first broadcast to the ${getCurrencyName()} network on 
      ${formattedDate(transactionData.timestamp)}. 
      The transaction is currently 
      ${
        transactionData.block.confirmations >= BLOCK_CONFIRMED_NUMBER ? 'confirmed' : 'unconfirmed'
      } by the network. `}
    {transactionData.isNonStandard
      ? 'Because the transaction is shielded, the amount sent is unknown.'
      : `At the time of this transaction 
      ${
        transactionData.totalAmount
          ? `${formatNumber(transactionData.totalAmount, {
              decimalsLength: 2,
            })} ${getCurrencyName()} was sent.`
          : `an unknown amount of ${getCurrencyName()} was sent (since it’s a shielded transaction).`
      } `}
  </Styles.ViewTransactionRawMuiAlert>
);

export const generateCoinbaseInfo = (info: number) => (
  <Alert severity="info">
    <AlertTitle>New coins ({formatNumber(info, { decimalsLength: 2 })})</AlertTitle>
  </Alert>
);

export const generateNonStandardTransactionInfo = () => (
  <Grid item xs={12}>
    <Styles.Alert severity="info">
      <AlertTitle>Shielded Transaction</AlertTitle>
    </Styles.Alert>
  </Grid>
);
