import { Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import { RowsProps } from '@components/InfinityTable/InfinityTable';
import { RowsProps as TableRowsProps, HeaderType } from '@components/Table/Table';

import * as ROUTES from '@utils/constants/routes';
import { formattedDate } from '@utils/helpers/date/date';
import { IAddressData, IAddress } from '@utils/types/IAddress';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formatAddress } from '@utils/helpers/format';

import {
  ADDRESS_TRANSACTION_TIMESTAMP_KEY,
  ADDRESS_TRANSACTION_HASH_KEY,
  ADDRESS_TRANSACTION_AMOUNT_KEY,
} from './AddressDetails.columns';

export const DEFAULT_ADDRESS_DATA: IAddress = {
  address: '',
  incomingSum: 0,
  outgoingSum: 0,
  data: [],
};

export const DATA_FETCH_LIMIT = 20;
export const DATA_OFFSET = 0;
export const DATA_DEFAULT_SORT = 'DESC';

export const generateLatestTransactions = (
  transactionsList: Array<IAddressData>,
  isMobile: boolean,
): RowsProps[] =>
  transactionsList.map(({ amount, timestamp, transactionHash }) => ({
    [ADDRESS_TRANSACTION_TIMESTAMP_KEY]: formattedDate(timestamp, {
      dayName: false,
    }),
    [ADDRESS_TRANSACTION_HASH_KEY]: (
      <Grid container alignItems="center" wrap="nowrap">
        <CopyButton copyText={transactionHash} />
        <RouterLink
          route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
          value={isMobile ? formatAddress(transactionHash) : transactionHash}
          textSize="large"
          title={transactionHash}
          className="transaction-hash-link"
        />
      </Grid>
    ),
    [ADDRESS_TRANSACTION_AMOUNT_KEY]: formatNumber(amount, { decimalsLength: 2 }),
  }));

export const generateAddressSummary = ({
  incomingSum,
  outgoingSum,
}: IAddress): TableRowsProps[] => {
  const outgoingAbsoluteSum = Math.abs(outgoingSum);

  return [
    {
      id: 1,
      data: [
        { id: 1, value: formatNumber(outgoingAbsoluteSum, { decimalsLength: 2 }) },
        { id: 2, value: formatNumber(incomingSum, { decimalsLength: 2 }) },
        { id: 3, value: formatNumber(incomingSum - outgoingAbsoluteSum, { decimalsLength: 2 }) },
      ],
    },
  ];
};

export const addressHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.addressDetails.totalSent' },
  { id: 2, header: 'pages.addressDetails.totalReceived' },
  { id: 3, header: 'pages.addressDetails.balance' },
];
