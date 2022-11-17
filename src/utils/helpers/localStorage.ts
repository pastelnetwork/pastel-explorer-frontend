import LZUTF8 from 'lzutf8';
import differenceInHours from 'date-fns/differenceInHours';

const initialValue = {};

export const readCacheValue = (key: string) => {
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
    const content = LZUTF8.compress(value, {
      outputEncoding: 'Base64',
    });
    window.localStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};
