import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { TSenseRequests } from '@utils/types/ITransactions';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from '@utils/helpers/localStorage';
import { SWR_OPTIONS } from '@utils/constants/statistics';

export default function useSenseDetails(id: string, txid: string) {
  let senseData = null;
  let isSenseLoading = true;
  const { data, isLoading } = useSWR<{ data: TSenseRequests }>(
    `${URLS.SENSE_URL}?registration_ticket_txid=${txid}&media_file_hash=${id}`,
    axiosGet,
    SWR_OPTIONS,
  );
  isSenseLoading = isLoading;
  senseData = getLocalStorageItem(`explorerSense-${txid}-${id}`);
  const senseCacheList = getLocalStorageItem('explorerSenseList') || [];
  if (senseCacheList?.length) {
    if (senseCacheList?.length > 5) {
      for (let i = 6; i < senseCacheList?.length; i += 1) {
        removeLocalStorageItem(`explorerSense-${senseCacheList[i].txid}-${senseCacheList[i].id}`);
      }
      senseCacheList.splice(0, 5);
    }
  }
  if (!senseData) {
    if (data?.data) {
      senseCacheList.push({ txid, id });
      setLocalStorageItem('explorerSenseList', JSON.stringify(senseCacheList));
      setLocalStorageItem(`explorerSense-${txid}-${id}`, JSON.stringify(data.data));
      senseData = data.data;
    }
  } else if (data?.data) {
    senseCacheList.push({ txid, id });
    setLocalStorageItem('explorerSenseList', JSON.stringify(senseCacheList));
    setLocalStorageItem(`explorerSense-${txid}-${id}`, JSON.stringify(data.data));
    senseData = data.data;
    isSenseLoading = false;
  } else {
    isSenseLoading = false;
  }

  return {
    senseData,
    isLoading: isSenseLoading,
  };
}
