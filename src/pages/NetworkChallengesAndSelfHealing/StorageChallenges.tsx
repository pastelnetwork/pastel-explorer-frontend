import InfinityTable from '@components/InfinityTable/InfinityTable';
import { useStorageChallenges } from '@hooks/useNetworkChallengesAndSelfHealing';

import * as Styles from './NetworkChallengesAndSelfHealing.styles';
import {
  storageChallengesColumns,
  transformStorageChallengesData,
} from './NetworkChallengesAndSelfHealing.helpers';

interface IStorageChallengesProps {
  pid: string;
}

export default function StorageChallenges({ pid }: IStorageChallengesProps) {
  const swrData = useStorageChallenges(pid);
  return (
    <Styles.StorageChallengesWrapper>
      <InfinityTable
        rows={swrData?.data?.length ? transformStorageChallengesData(swrData.data) : []}
        columns={storageChallengesColumns}
        className="data-table tickets-table"
        headerBackground
        tableHeight={1800}
        rowHeight={300}
      />
    </Styles.StorageChallengesWrapper>
  );
}
