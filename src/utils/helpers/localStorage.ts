import LZUTF8 from 'lzutf8';
import differenceInHours from 'date-fns/differenceInHours';

import { DEFAULT_API_URL } from '@utils/constants/urls';

const initialValue = {};
const HISTORICAL_STATISTICS_LOCAL_STORAGE = 'explorerHistoricalStatistics';
const CLUSTER_URL_LOCAL_STORAGE = 'explorerClusterUrl';
const LIMIT = 5;

const getCurrentCluster = () => {
  const persist = window.localStorage.getItem('persist:root');
  let url = DEFAULT_API_URL || '';
  if (persist) {
    const store = JSON.parse(persist);
    const cluster = JSON.parse(store.cluster);
    url = cluster.url;
  }
  return url;
};

export const readCacheValue = (key: string, isMicroseconds = false) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const clusterUrl = getCurrentCluster();
    const clusterUrlLocalStorage = window.localStorage.getItem(CLUSTER_URL_LOCAL_STORAGE);
    if (clusterUrlLocalStorage && clusterUrl !== clusterUrlLocalStorage) {
      return initialValue;
    }

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

export const setCacheValue = (key: string, value: string) => {
  if (typeof window === 'undefined') {
    console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
  }
  try {
    let items: string[] = [];
    const localHS = window.localStorage.getItem(HISTORICAL_STATISTICS_LOCAL_STORAGE);
    const content = LZUTF8.compress(value, {
      outputEncoding: 'Base64',
    });
    const clusterUrl = getCurrentCluster();
    if (localHS) {
      items = JSON.parse(localHS);
      if (items?.length) {
        const clusterUrlLocalStorage = window.localStorage.getItem(CLUSTER_URL_LOCAL_STORAGE);
        if (clusterUrlLocalStorage && clusterUrl !== clusterUrlLocalStorage) {
          for (let i = 0; i < items.length; i += 1) {
            window.localStorage.removeItem(items[i]);
          }
          items = [];
        } else {
          items = items.filter(i => i !== key);
          for (let i = 0; i < items.length - LIMIT; i += 1) {
            window.localStorage.removeItem(items[i]);
          }
          items.splice(0, items.length - LIMIT);
        }
      }
    }
    items.push(key);
    window.localStorage.setItem(HISTORICAL_STATISTICS_LOCAL_STORAGE, JSON.stringify(items));
    window.localStorage.setItem(key, JSON.stringify(content));
    window.localStorage.setItem(CLUSTER_URL_LOCAL_STORAGE, clusterUrl);
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};
