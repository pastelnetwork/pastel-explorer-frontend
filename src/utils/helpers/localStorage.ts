import LZUTF8 from 'lzutf8';
import differenceInHours from 'date-fns/differenceInHours';

import { THistoricalStatisticsCache } from '@utils/types/IStatistics';

const initialValue = {};
const HISTORICAL_STATISTICS_LOCAL_STORAGE = 'explorerHistoricalStatistics';
const LIMIT = 5;

export const readCacheValue = (key: string, isMicroseconds = false) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    const result = item
      ? JSON.parse(
          LZUTF8.decompress(JSON.parse(item), {
            inputEncoding: 'Base64',
          }),
        )
      : initialValue;
    if (
      differenceInHours(Date.now(), isMicroseconds ? result.lastDate * 1000 : result.lastDate) > 4
    ) {
      return initialValue;
    }

    return result.currentCache;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return initialValue;
  }
};

export const setCacheValue = (key: string, value: string, lastDate: number) => {
  if (typeof window === 'undefined') {
    console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
  }
  try {
    const items = window.localStorage.getItem(HISTORICAL_STATISTICS_LOCAL_STORAGE);
    const content = LZUTF8.compress(value, {
      outputEncoding: 'Base64',
    });
    let currentCache: THistoricalStatisticsCache[] = [];
    if (items) {
      currentCache = JSON.parse(items);
      const item = currentCache.find(i => i.chart === key);
      if (item) {
        currentCache = currentCache.filter(i => i.chart !== key);
      }
      if (currentCache.length === LIMIT) {
        const removeItem = currentCache.slice(0, 1);
        const newCache = currentCache.slice(1, currentCache.length);
        if (removeItem.length) {
          window.localStorage.removeItem(removeItem[0].chart);
        }
        currentCache = newCache;
      }
    }
    currentCache.push({
      chart: key,
      lastDate,
    });
    window.localStorage.setItem(HISTORICAL_STATISTICS_LOCAL_STORAGE, JSON.stringify(currentCache));
    window.localStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};
