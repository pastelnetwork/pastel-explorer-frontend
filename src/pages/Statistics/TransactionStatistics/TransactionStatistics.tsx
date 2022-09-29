import { Grid } from '@material-ui/core';

import IncomingTransactions from './IncomingTransactions';
import VolumeTransactions from './VolumeTransactions';

import * as Styles from '../Statistics.styles';

const TransactionStatistics: React.FC = () => {
  return (
    <Styles.BlockWrapper>
      <Styles.BlockTitle>Transactions Statistics</Styles.BlockTitle>
      <Grid>
        <Styles.TransactionsStatisticsWrapper>
          <VolumeTransactions />
          <IncomingTransactions />
        </Styles.TransactionsStatisticsWrapper>
      </Grid>
    </Styles.BlockWrapper>
  );
};

export default TransactionStatistics;
