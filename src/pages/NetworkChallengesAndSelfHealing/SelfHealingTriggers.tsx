import InfinityTable from '@components/InfinityTable/InfinityTable';
import { useSelfHealingTriggers } from '@hooks/useNetworkChallengesAndSelfHealing';

import * as Styles from './NetworkChallengesAndSelfHealing.styles';
import {
  selfHealingTriggersColumns,
  transformSelfHealingTriggersData,
} from './NetworkChallengesAndSelfHealing.helpers';

interface ISelfHealingTriggersProps {
  pid: string;
}

export default function SelfHealingTriggers({ pid }: ISelfHealingTriggersProps) {
  const swrData = useSelfHealingTriggers(pid);
  return (
    <Styles.SelfHealingTriggersWrapper>
      <InfinityTable
        rows={swrData?.data?.length ? transformSelfHealingTriggersData(swrData.data) : []}
        columns={selfHealingTriggersColumns}
        className="data-table tickets-table"
        headerBackground
        tableHeight={1800}
        rowHeight={600}
      />
    </Styles.SelfHealingTriggersWrapper>
  );
}
