import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import intervalToDuration from 'date-fns/intervalToDuration';

export const currentDate = new Date();
export const getDate = (value: number | string | Date) => new Date(value);
export const formattedDate = (
  timestamp: number,
  options: { dayName: boolean } = { dayName: true },
) => {
  const dateFormat = options.dayName ? 'EEEEEE, do MMM yyyy HH:mm:ss' : 'do MMM yyyy HH:mm:ss';

  return format(fromUnixTime(timestamp), dateFormat);
};
export const formattedTimeElapsed = (timestamp: number) => {
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: currentDate,
    end: fromUnixTime(timestamp),
  });

  return `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
};
