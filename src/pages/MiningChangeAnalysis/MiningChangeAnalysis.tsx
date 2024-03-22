import useMiningChangeAnalysis from '@hooks/useMiningChangeAnalysis';
import * as StatisticsStyles from '@pages/Statistics/Statistics.styles';

import Trailing50BlockAverageBlocks from './Trailing50BlockAverageBlocks';
import Trailing10BlockAverageBlockTime from './Trailing10BlockAverageBlockTime';
import TimeBetweenBlocksInMinutes from './TimeBetweenBlocksInMinutes';
import Trailing50Block from './Trailing50Block';
import * as Styles from './MiningChangeAnalysis.styles';

const MiningChangeAnalysis: React.FC = () => {
  const { data, isLoading } = useMiningChangeAnalysis();

  return (
    <Styles.Wrapper>
      <StatisticsStyles.ChartWrapper>
        <Trailing50BlockAverageBlocks data={data} isLoading={isLoading} />
        <Trailing10BlockAverageBlockTime data={data} isLoading={isLoading} />
        <TimeBetweenBlocksInMinutes data={data} isLoading={isLoading} />
        <Trailing50Block data={data} isLoading={isLoading} />
      </StatisticsStyles.ChartWrapper>
    </Styles.Wrapper>
  );
};

export default MiningChangeAnalysis;
