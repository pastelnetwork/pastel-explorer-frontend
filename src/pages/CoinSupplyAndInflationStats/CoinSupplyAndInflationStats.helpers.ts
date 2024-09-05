import { subMonths, fromUnixTime, format } from 'date-fns';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { TCoinSupplyAndInflationStats } from '@utils/types/IStatistics';

type TDateRange = {
  value: number;
  type: string;
};

export const dateRange = [
  {
    value: 12,
    type: 'year',
  },
  {
    value: 6,
    type: 'month',
  },
  {
    value: 3,
    type: 'month',
  },
  {
    value: 1,
    type: 'month',
  },
];

export const periods = JSON.parse(JSON.stringify(dateRange))
  .sort((a: TDateRange, b: TDateRange) => a.value - b.value)
  .map((date: TDateRange) => date.value.toString())
  .join(',');

const convertDate = (date: number) => {
  return format(fromUnixTime(new Date(date).getTime() / 1000), 'MM/yyyy');
};

export const getCoinSupplyAndInflationStatsData = (
  items: TCoinSupplyAndInflationStats[] | null,
) => {
  if (!items?.length) {
    return null;
  }
  const dates: string[] = [];
  const circulatingSupply: number[] = [];
  const coinSupply: number[] = [];
  for (let i = 0; i <= dateRange.length - 1; i += 1) {
    const item = dateRange[i];
    const targetDate = subMonths(new Date(), item.value);
    const data = items.filter(
      c => convertDate(c.time) === convertDate(new Date(targetDate).getTime()),
    );
    dates.push(format(fromUnixTime(new Date(targetDate).getTime() / 1000), 'MM/dd/yyyy'));
    if (data?.length) {
      const targetItem = data[data.length - 1];
      circulatingSupply.push(targetItem.circulatingSupply);
      coinSupply.push(targetItem.coinSupply);
    } else {
      circulatingSupply.push(0);
      coinSupply.push(0);
    }
  }
  const latestItem = items[items.length - 1];
  return {
    dates,
    circulatingSupply,
    coinSupply,
    today: {
      circulatingSupply: latestItem.circulatingSupply,
      coinSupply: latestItem.coinSupply,
      date: format(fromUnixTime(new Date().getTime() / 1000), 'MM/dd/yyyy'),
    },
    start: {
      date: format(fromUnixTime(new Date(items[0].time).getTime() / 1000), 'MM/dd/yyyy'),
      circulatingSupply: items[0].circulatingSupply,
      coinSupply: items[0].coinSupply,
    },
  };
};

export const getPercent = (value: number, total: number) => {
  if (!value || !total) {
    return 0;
  }
  const newValue = total - value;
  return formatNumber(Number(((newValue * 100) / total).toFixed(1)), { decimalsLength: 1 });
};
