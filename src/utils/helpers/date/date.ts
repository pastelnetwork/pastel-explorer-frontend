import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import intervalToDuration from 'date-fns/intervalToDuration';

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
    start: now,
    end: fromUnixTime(timestamp),
  });

  return `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
};
export const formatFullDate = (timestamp: number, options: DateOptions = initialDateOptions) => {
  const dateFormat = generateDateFormat(options);

  return format(timestamp, dateFormat);
};
