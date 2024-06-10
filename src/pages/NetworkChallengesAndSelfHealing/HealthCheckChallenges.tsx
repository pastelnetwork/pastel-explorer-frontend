import InfinityTable from '@components/InfinityTable/InfinityTable';
import { useHealthCheckChallenges } from '@hooks/useNetworkChallengesAndSelfHealing';

import * as Styles from './NetworkChallengesAndSelfHealing.styles';
import {
  healthCheckChallengesColumns,
  transformHealthCheckChallengesData,
} from './NetworkChallengesAndSelfHealing.helpers';

interface IHealthCheckChallengesProps {
  pid: string;
}

export default function HealthCheckChallenges({ pid }: IHealthCheckChallengesProps) {
  const swrData = useHealthCheckChallenges(pid);

  return (
    <Styles.HealthCheckChallengesWrapper>
      <InfinityTable
        rows={swrData?.data?.length ? transformHealthCheckChallengesData(swrData.data) : []}
        columns={healthCheckChallengesColumns}
        className="data-table tickets-table"
        headerBackground
        tableHeight={1800}
        rowHeight={200}
      />
    </Styles.HealthCheckChallengesWrapper>
  );
}
