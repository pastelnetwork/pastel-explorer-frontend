import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

export const currentDate = new Date();
export const getDate = (value: number | string | Date) => new Date(value);
export const formattedDate = (
  timestamp: number,
  options: { dayName: boolean } = { dayName: true },
) => {
  const dateFormat = options.dayName ? 'EEEEEE, do MMM yyyy HH:mm:ss' : 'do MMM yyyy HH:mm:ss';

  return format(fromUnixTime(timestamp), dateFormat);
};
