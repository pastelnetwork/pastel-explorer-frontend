import useSWRInfinite from 'swr/infinite';

import { SWR_OPTIONS } from '@utils/constants/statistics';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { IBlock } from '@utils/types/IBlocks';

export default function useBlockDetails(id: string) {
  const { data, isLoading } = useSWRInfinite<{ data: IBlock }>(
    () => `${URLS.BLOCK_URL}/${id}`,
    axiosGet,
    SWR_OPTIONS,
  );
  return {
    swrData: data ? data[0].data : null,
    isLoading,
  };
}
