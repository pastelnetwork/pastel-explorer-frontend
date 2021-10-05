import { Grid } from '@material-ui/core';

import { HeaderType } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';

import RouterLink from '@components/RouterLink/RouterLink';
import LinearProgress from '@components/Progress/LinearProgress/LinearProgress';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IRichlist } from '@utils/types/IRichlists';
import { getCurrencyName } from '@utils/appInfo';

const LIST_DIVIDERS = [
  [0, 25],
  [25, 50],
  [50, 75],
  [75, 100],
];

export const balanceHeaders: Array<HeaderType> = [
  { id: 1, header: '', key: 'rank' },
  { id: 2, header: 'Address', key: 'address' },
  { id: 3, header: `Balance (${getCurrencyName()})`, key: 'amount' },
  { id: 4, header: '%', key: 'percentage' },
];

export const distributionHeaders: Array<HeaderType> = [
  { id: 1, header: '' },
  { id: 2, header: `Amount (${getCurrencyName()})` },
  { id: 3, header: '%' },
];

export const generateBalanceTable = (list: Array<IRichlist>) => {
  return list.map(({ rank, percentage, amount, address }) => {
    return {
      id: address,
      data: [
        { value: rank, id: 1 },
        {
          value: (
            <Grid container alignItems="center" wrap="nowrap">
              <CopyButton copyText={address} />
              <RouterLink
                route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
                value={address}
                textSize="large"
              />
            </Grid>
          ),
          id: 2,
        },
        { value: formatNumber(amount, { decimalsLength: 2 }), id: 3 },
        { value: formatNumber(percentage, { decimalsLength: 2 }), id: 4 },
      ],
    };
  });
};

const generateWealthDistributionRow = (list: Array<IRichlist>, rowLabel: string) => {
  const rowId = list[0]?.address || '';
  const { amount, percentage } = list.reduce(
    (acc, listElement) => {
      return {
        amount: acc.amount + listElement.amount,
        percentage: acc.percentage + listElement.percentage,
      };
    },
    { amount: 0, percentage: 0 },
  );

  return {
    id: rowId,
    data: [
      { value: rowLabel, id: 1 },
      { value: formatNumber(amount, { decimalsLength: 2 }), id: 2 },
      {
        value: (
          <LinearProgress
            value={percentage}
            description={formatNumber(percentage, { decimalsLength: 2 })}
          />
        ),
        id: 3,
      },
    ],
  };
};

export const generateWealthDistributionTable = (list: IRichlist[]) => {
  const dividedLists = LIST_DIVIDERS.map(([firstDivider, lastDivider]) => {
    const currentWealthDistributionList = list.slice(firstDivider, lastDivider);
    const rowLabel = `Top ${firstDivider + 1}-${lastDivider}`;
    return generateWealthDistributionRow(currentWealthDistributionList, rowLabel);
  });

  return dividedLists;
};
