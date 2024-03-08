import { intervalToDuration, fromUnixTime } from 'date-fns';

import { getDate, formattedDate, formattedTimeElapsed, formatFullDate } from '../date';

describe('utils/helpers/date', () => {
  test('getDate should works correctly', () => {
    const date = '2023-03-13';
    expect(getDate(date)).toEqual(new Date(date));
  });

  test('getDate should works incorrectly', () => {
    const date = '28-12-2023';
    expect(getDate(date)).not.toEqual(new Date(date));
  });

  test('formattedDate should works correctly', () => {
    const date = 1678681807888;
    expect(formattedDate(date)).toEqual('Fr, 23rd Apr 55165 21:11:28');
  });

  test('formattedDate should works incorrectly', () => {
    expect(formattedDate(123)).not.toEqual('Fr, 23rd Apr 55165 21:11:28');
  });

  test('formattedTimeElapsed should works correctly', () => {
    const date = 1678681807888;
    const currentDate = new Date();
    const { days, hours, minutes, seconds } = intervalToDuration({
      start: currentDate,
      end: fromUnixTime(date),
    });
    expect(formattedTimeElapsed(date, currentDate)).toEqual(
      `${days}d ${hours}h ${minutes}m ${seconds}s ago`,
    );
  });

  test('formattedTimeElapsed should works incorrectly', () => {
    const currentDate = new Date();
    const { days, hours, minutes, seconds } = intervalToDuration({
      start: currentDate,
      end: fromUnixTime(1678681807888),
    });
    expect(formattedTimeElapsed(100, currentDate)).not.toEqual(
      `${days}d ${hours}h ${minutes}m ${seconds}s ago`,
    );
  });

  test('formatFullDate should works correctly', () => {
    const date = 1678681807888;
    expect(formatFullDate(date)).toEqual('Mo, 13th Mar 2023 11:30:07');
  });

  test('formatFullDate should works incorrectly', () => {
    expect(formatFullDate(123)).not.toEqual('Mo, 13th Mar 2023 11:30:07');
  });
});
