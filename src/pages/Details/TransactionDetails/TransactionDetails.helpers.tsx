import { Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import parse from 'html-react-parser';

import { HeaderType } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';
import { ITransactionDetails } from '@utils/types/ITransactions';
import { formattedDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import * as Styles from './TransactionDetails.styles';

const BLOCK_CONFIRMED_NUMBER = 1;

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.transactionDetails.blockHash' },
  { id: 2, header: 'pages.transactionDetails.confirmations' },
  { id: 4, header: 'pages.transactionDetails.recipients' },
  { id: 5, header: 'pages.transactionDetails.amount' },
  { id: 6, header: 'pages.transactionDetails.timestamp' },
];

export const addressHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.transactionDetails.address', key: 'address' },
  { id: 2, header: 'pages.transactionDetails.amount', key: 'amount' },
  { id: 3, header: 'pages.transactionDetails.amountUSD', key: 'amount' },
];

export const generateTableTitle = (
  transactionData: ITransactionDetails,
  toggleOpenRawData: () => void,
) => (
  <Styles.ViewTransactionRawMuiAlert severity="info">
    <AlertTitle style={{ wordBreak: 'break-word' }}>
      {getCurrencyName()} {parse(translate('pages.transactionDetails.txId'))}: {transactionData.id}{' '}
      <span>
        (
        <Styles.RawDataWrapper>
          <CopyButton copyText={transactionData.rawData} />
          <Styles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
            {parse(translate('pages.transactionDetails.viewTransactionRawData'))}
          </Styles.ViewTransactionRaw>
        </Styles.RawDataWrapper>
        )
      </span>
    </AlertTitle>
    {parse(
      translate('pages.transactionDetails.transactionMessage', {
        currency: getCurrencyName(),
        timestamp: formattedDate(transactionData.timestamp, {
          dayName: false,
        }),
        confirmations:
          transactionData.block.confirmations >= BLOCK_CONFIRMED_NUMBER
            ? parse(translate('pages.transactionDetails.confirmed'))
            : parse(translate('pages.transactionDetails.unconfirmed')),
        reason: transactionData.isNonStandard
          ? parse(translate('pages.transactionDetails.shieldedTransactionInfo'))
          : parse(
              translate('pages.transactionDetails.transparentTransactionInfo', {
                info: transactionData.totalAmount
                  ? parse(
                      translate('pages.transactionDetails.totalAmountTransactionInfo', {
                        totalAmount: formatNumber(transactionData.totalAmount, {
                          decimalsLength: 2,
                        }),
                        currency: getCurrencyName(),
                      }),
                    )
                  : parse(
                      translate('pages.transactionDetails.unknownTransactionInfo', {
                        currency: getCurrencyName(),
                      }),
                    ),
              }),
            ),
      }),
    )}
  </Styles.ViewTransactionRawMuiAlert>
);

export const generateCoinbaseInfo = (info: number) => (
  <Alert
    severity="info"
    icon={
      <Tooltip
        title={translateDropdown('pages.transactionDetails.coinbaseInfo', {
          currency: getCurrencyName(),
        })}
        arrow
      >
        <InfoOutlinedIcon fontSize="small" />
      </Tooltip>
    }
  >
    <AlertTitle>
      {parse(translate('pages.transactionDetails.newCoins'))} (
      {formatNumber(info, { decimalsLength: 2 })})
    </AlertTitle>
  </Alert>
);

export const generateNonStandardTransactionInfo = () => (
  <Grid item xs={12}>
    <Styles.Alert
      severity="info"
      icon={
        <Tooltip
          title={translateDropdown('pages.transactionDetails.nonStandardTransactionInfo')}
          arrow
        >
          <InfoOutlinedIcon fontSize="small" />
        </Tooltip>
      }
    >
      <AlertTitle>{parse(translate('pages.transactionDetails.shieldedTransaction'))}</AlertTitle>
    </Styles.Alert>
  </Grid>
);
