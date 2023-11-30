import { makeStyles } from '@mui/styles';

import useBlockStatistics from '@hooks/useBlockStatistics';
import { TAppTheme } from '@theme/index';
import * as StatisticsStyles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

import NetworkStatistics from './NetworkStatistics/NetworkStatistics';
import BlockStatistics from './BlockStatistics/BlockStatistics';
import BlockSizes from './BlockStatistics/BlockSizes';
import VolumeTransactions from './TransactionStatistics/VolumeTransactions';
import IncomingTransactions from './TransactionStatistics/IncomingTransactions';
import * as Styles from './Statistics.styles';

const useStyles = makeStyles((theme: TAppTheme) => ({
  blockSpace: {
    marginBottom: `${theme.spacing(4)}px`,
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing(2)}px`,
    },
  },
}));

const Statistics = () => {
  const { blockElements, blocksUnconfirmed } = useBlockStatistics();

  const classes = useStyles();
  return (
    <Styles.StatisticsContainer>
      <BlockStatistics blockElements={blockElements} blocksUnconfirmed={blocksUnconfirmed} />
      <div className={classes.blockSpace} />
      <Styles.BlockWrapper className="no-shadow">
        <StatisticsStyles.Wrapper>
          <Styles.ChartWrapper>
            <BlockSizes blockElements={blockElements} />
            <NetworkStatistics blockElements={blockElements} />
            <VolumeTransactions blockElements={blockElements} />
            <IncomingTransactions blockElements={blockElements} />
          </Styles.ChartWrapper>
        </StatisticsStyles.Wrapper>
      </Styles.BlockWrapper>
    </Styles.StatisticsContainer>
  );
};

export default Statistics;
