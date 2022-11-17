import differenceInHours from 'date-fns/differenceInHours';

const initialValue = {};

export const readCacheValue = (key: string) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    const result = item ? JSON.parse(JSON.parse(item)) : initialValue;
    if (differenceInHours(Date.now(), result.lastDate) > 4) {
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
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};
