import LZString from 'lz-string';
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
    const result = item ? JSON.parse(LZString.decompress(JSON.parse(item))) : initialValue;
    if (result) {
      if (
        differenceInHours(Date.now(), isMicroseconds ? result.lastDate * 1000 : result?.lastDate) >
        4
      ) {
        return initialValue;
      }
      return result?.currentCache || initialValue;
    }
    return initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”: ${(error as Error)?.message}`);
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
    const content = LZString.compress(value);
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
    return true;
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”: ${(error as Error)?.message}`);
    return false;
  }
};

export const getLocalStorageItem = (key: string) => {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(LZString.decompress(JSON.parse(item)));
    }
    return null;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: string) => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    const content = LZString.compress(value);
    window.localStorage.setItem(key, JSON.stringify(content));
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

export const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
};
