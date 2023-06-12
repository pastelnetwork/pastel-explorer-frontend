import useSWR from 'swr';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { INetwork } from '@utils/types/INetwork';
import { DATA_FETCH_LIMIT, DATA_OFFSET } from '@pages/Supernodes/Supernodes.helpers';

export default function useSupernodes() {
  const { data, isLoading } = useSWR<INetwork>(
    `${URLS.NETWORK_URL}?limit=${DATA_FETCH_LIMIT}&offset=${DATA_OFFSET}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    masternodes: data?.masternodes?.sort((a, b) => {
      if (a.masternodeRank < 0) {
        return 1;
      }
      if (b.masternodeRank < 0) {
        return -1;
      }
      return a.masternodeRank - b.masternodeRank;
    }),
    isLoading,
  };
}
