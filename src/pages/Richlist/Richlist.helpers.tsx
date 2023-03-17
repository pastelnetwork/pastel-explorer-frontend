import { Grid } from '@material-ui/core';

import { HeaderType } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';

import RouterLink from '@components/RouterLink/RouterLink';

import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IRichlist } from '@utils/types/IRichlists';
import { getCurrencyName } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import { ReactComponent as CrownIcon } from '@assets/icons/crown.svg';
import { ReactComponent as CrownPolygonIcon1 } from '@assets/icons/crown-polygon-1.svg';
import { ReactComponent as CrownPolygonIcon2 } from '@assets/icons/crown-polygon-2.svg';
import { ReactComponent as CrownPolygonIcon3 } from '@assets/icons/crown-polygon-3.svg';
import { ReactComponent as CrownPolygonIcon4 } from '@assets/icons/crown-polygon-4.svg';

import * as Styles from './Richlist.styles';

const LIST_DIVIDERS = [
  [0, 10],
  [0, 25],
  [0, 100],
  [0, 250],
];

export const balanceHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.richlist.rank', key: 'rank' },
  { id: 2, header: 'pages.richlist.address', key: 'address' },
  { id: 3, header: `pages.richlist.balance`, key: 'amount' },
  { id: 4, header: 'pages.richlist.percentage', key: 'percentage' },
];

export const generateBalanceTable = (list: Array<IRichlist>, coinSupply: number) => {
  return list.map(({ rank, amount, address }) => {
    const percentage = (amount * 100) / coinSupply;
    const generateRank = () => {
      if (rank > 3) {
        return <Styles.RankStyle>#{rank}</Styles.RankStyle>;
      }

      let className = 'bronze';
      if (rank === 1) {
        className = 'gold';
      } else if (rank === 2) {
        className = 'silver';
      }

      return (
        <Styles.RankStyle>
          <CrownIcon className={`crown-icon ${className}`} /> <span>{rank}</span>
        </Styles.RankStyle>
      );
    };

    return {
      id: address,
      data: [
        {
          value: generateRank(),
          id: 1,
        },
        {
          value: (
            <Grid container alignItems="center" wrap="nowrap">
              <CopyButton copyText={address} />
              <RouterLink
                route={`${ROUTES.ADDRESS_DETAILS}/${address}?p=richlist`}
                value={address}
                textSize="large"
                className="address-link"
              />
            </Grid>
          ),
          id: 2,
        },
        { value: formatNumber(amount, { decimalsLength: 2 }), id: 3 },
        { value: `${formatNumber(percentage, { decimalsLength: 2 })}%`, id: 4 },
      ],
    };
  });
};

const generateWealthDistributionItem = (
  list: Array<IRichlist>,
  rowLabel: string,
  className: string,
  top: number,
  coinSupply: number,
) => {
  const rowId = list[0]?.address || '';

  const { amount, percentage } = list.reduce(
    (acc, listElement) => {
      return {
        amount: acc.amount + listElement.amount,
        percentage:
          acc.percentage + parseFloat(((listElement.amount * 100) / coinSupply).toFixed(2)),
      };
    },
    { amount: 0, percentage: 0 },
  );

  return {
    id: rowId,
    title: rowLabel,
    amount,
    top,
    data: (
      <>
        <Styles.Icon>
          {className === 'top-1-10' ? <CrownPolygonIcon1 className={className} /> : null}
          {className === 'top-1-25' ? <CrownPolygonIcon2 className={className} /> : null}
          {className === 'top-1-100' ? <CrownPolygonIcon3 className={className} /> : null}
          {className === 'top-1-250' ? <CrownPolygonIcon4 className={className} /> : null}
        </Styles.Icon>
        <Styles.Content>
          <Styles.ValueWrapper>
            <Styles.InfoTitle>{rowLabel}</Styles.InfoTitle>
            <Styles.InfoValue>
              {formatNumber(amount, { decimalsLength: 2 })} ({getCurrencyName()})
            </Styles.InfoValue>
          </Styles.ValueWrapper>
          <Styles.PercentageWrapper>
            <Styles.PercentageTitle>
              {translate('pages.richlist.percentage')}
            </Styles.PercentageTitle>
            <Styles.PercentageValue>
              {formatNumber(percentage, { decimalsLength: 2 })}%
            </Styles.PercentageValue>
          </Styles.PercentageWrapper>
        </Styles.Content>
      </>
    ),
  };
};

export const generateWealthDistributionData = (list: IRichlist[], coinSupply: number) => {
  const newList = list.sort((a, b) => a.rank - b.rank);
  const dividedLists = LIST_DIVIDERS.map(([firstDivider, lastDivider]) => {
    const currentWealthDistributionList = newList.slice(firstDivider, lastDivider);
    const rowLabel = translate('pages.richlist.percentage', {
      rank: `${firstDivider + 1}-${lastDivider}`,
    });
    return generateWealthDistributionItem(
      currentWealthDistributionList,
      rowLabel,
      `top-${firstDivider + 1}-${lastDivider}`,
      firstDivider + 1 + lastDivider,
      coinSupply,
    );
  });
  return dividedLists;
};
