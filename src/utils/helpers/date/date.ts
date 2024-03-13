import { fromUnixTime, format, getTime, subHours, intervalToDuration } from 'date-fns';

interface DateOptions {
  dayName?: boolean;
  onlyDayMonthYear?: boolean;
}

const initialDateOptions = {
  dayName: true,
  onlyDayMonthYear: false,
};

const generateDateFormat = ({ dayName, onlyDayMonthYear }: DateOptions) => {
  if (onlyDayMonthYear) {
    return 'd MMM yy';
  }

  if (dayName) {
    return 'EEEEEE, do MMM yyyy HH:mm:ss';
  }

  return 'do MMM yyyy HH:mm:ss';
};

export const currentDate = new Date();
export const getCurrentUnixTimestamp = getTime(currentDate) / 1000;
export const getDate = (value: number | string | Date) => new Date(value);
export const formattedDate = (timestamp: number, options: DateOptions = initialDateOptions) => {
  const dateFormat = generateDateFormat(options);

  return format(fromUnixTime(timestamp), dateFormat);
};
export const formattedTimeElapsed = (timestamp: number, now = currentDate) => {
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: fromUnixTime(timestamp),
    end: now,
  });

  return `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
};
export const formatFullDate = (timestamp: number, options: DateOptions = initialDateOptions) => {
  const dateFormat = generateDateFormat(options);

  return format(timestamp, dateFormat);
};

export const periodData = {
  '24h': 24,
  '1d': 24,
  '7d': 7 * 24,
  '14d': 14 * 24,
  '30d': 30 * 24,
  '60d': 60 * 24,
  '90d': 90 * 24,
  '180d': 180 * 24,
};

export const getSubHours = (period: string | null) => {
  if (!period) {
    return 0;
  }
  const duration = periodData[period as keyof typeof periodData] ?? 0;
  return subHours(new Date(), duration).valueOf();
};
