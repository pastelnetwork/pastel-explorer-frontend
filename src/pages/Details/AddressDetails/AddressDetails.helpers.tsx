import { Grid } from '@mui/material';
import { format } from 'date-fns';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import { RowsProps } from '@components/InfinityTable/InfinityTable';
import { RowsProps as TableRowsProps, HeaderType } from '@components/Table/Table';

import * as ROUTES from '@utils/constants/routes';
import { formattedDate } from '@utils/helpers/date/date';
import { IAddressData, IAddress } from '@utils/types/IAddress';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formatAddress } from '@utils/helpers/format';
import { TChartStatisticsResponse } from '@utils/types/IStatistics';
import { translate } from '@utils/helpers/i18n';
import { isPastelBurnAddress } from '@utils/appInfo';

import {
  ADDRESS_TRANSACTION_TIMESTAMP_KEY,
  ADDRESS_TRANSACTION_HASH_KEY,
  ADDRESS_TRANSACTION_AMOUNT_KEY,
  ADDRESS_TRANSACTION_DIRECTION_KEY,
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
  address: string,
): RowsProps[] =>
  transactionsList.map(({ amount, timestamp, transactionHash, direction }) => ({
    [ADDRESS_TRANSACTION_TIMESTAMP_KEY]: formattedDate(timestamp, {
      dayName: false,
    }),
    [ADDRESS_TRANSACTION_HASH_KEY]: (
      <Grid container alignItems="center" wrap="nowrap">
        <CopyButton copyText={transactionHash} />
        <RouterLink
          route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
          value={formatAddress(transactionHash, 15, -4)}
          textSize="large"
          title={transactionHash}
          className="transaction-hash-link"
        />
      </Grid>
    ),
    [ADDRESS_TRANSACTION_DIRECTION_KEY]: (
      <div
        className={`direction-status ${direction.toLowerCase()} ${
          isPastelBurnAddress(address) ? 'burned' : ''
        }`}
      >
        {direction === 'Outgoing'
          ? parse(translate('pages.addressDetails.balanceHistory.sent'))
          : parse(
              translate(
                `pages.addressDetails.balanceHistory.${
                  isPastelBurnAddress(address) ? 'burned' : 'received'
                }`,
              ),
            )}
      </div>
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

export const transformChartData = (data: TChartStatisticsResponse[] | null) => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  if (data?.length) {
    data.forEach(item => {
      if (item.time) {
        dataX.push(format(item.time, 'MM/dd/yyyy'));
        dataY.push(item.value <= 0 ? 0 : item.value);
      }
    });

    const nowHour = format(new Date(), 'MM/dd/yyyy');
    const targetHour = format(new Date(dataX[dataX.length - 1]), 'MM/dd/yyyy');
    if (nowHour !== targetHour) {
      dataX.push(format(new Date(), 'MM/dd/yyyy'));
      dataY.push(dataY[dataY.length - 1]);
    }
  }

  return {
    dataX,
    dataY,
  };
};

export const transformDirectionChartData = (data: TChartStatisticsResponse[] | null) => {
  const dataX: string[] = [];
  const dataY: number[] = [];
  if (data?.length) {
    data.forEach(item => {
      if (item.time) {
        dataX.push(item.time.toString());
        dataY.push(item.value);
      }
    });
  }

  return {
    dataX,
    dataY,
  };
};

export const isValidAddress = (address: string) => {
  const defaultCurrencyName = process.env.REACT_APP_EXPLORER_DEFAULT_CURRENCY_NAME;
  if (defaultCurrencyName === 'PSL' && address?.length === 35 && address.startsWith('Pt')) {
    return true;
  }
  if (defaultCurrencyName === 'LSP' && address?.length === 35 && address.startsWith('tP')) {
    return true;
  }
  if (defaultCurrencyName === 'DEV' && address?.length === 36 && address.startsWith('44o')) {
    return true;
  }
  return false;
}
