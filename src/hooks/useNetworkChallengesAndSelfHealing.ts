import useSWRInfinite from 'swr/infinite';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import {
  IStorageChallenges,
  IHealthCheckChallenges,
  ISelfHealingTriggers,
} from '@utils/types/INetworkChallengesAndSelfHealing';

import { storageChallenges, healthCheckChallenges, selfHealingTriggers } from './mockup';

const domain = process.env.REACT_APP_EXPLORER_NETWORK_CHALLENGE_AND_SELF_HEALING;

export function useStorageChallenges(pid: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: IStorageChallenges[];
  }>(() => `${domain}/${URLS.GET_STATISTICS_STORAGE_CHALLENGES}?pid=${pid}`, axiosGet);
  return {
    data: storageChallenges || data?.[0].data,
    isLoading,
  };
}

export function useHealthCheckChallenges(pid: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: IHealthCheckChallenges[];
  }>(() => `${domain}/${URLS.GET_STATISTICS_HEALTH_CHECK_CHALLENGES}?pid=${pid}`, axiosGet);
  return {
    data: healthCheckChallenges || data?.[0]?.data,
    isLoading,
  };
}

export function useSelfHealingTriggers(pid: string) {
  const { data, isLoading } = useSWRInfinite<{
    data: ISelfHealingTriggers[];
  }>(() => `${domain}/${URLS.GET_STATISTICS_SELF_HEALING_CHALLENGES}?pid=${pid}`, axiosGet);
  return {
    data: selfHealingTriggers.reports || data?.[0].data,
    isLoading,
  };
}
