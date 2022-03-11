import { Grid } from '@material-ui/core';

import IncomingTransactions from './IncomingTransactions';
import VolumeTransactions from './VolumeTransactions';

import * as Styles from '../Statistics.styles';

const TransactionStatistics: React.FC = () => {
  return (
    <Styles.BlockWrapper>
      <Styles.BlockTitle>Transactions Statistics</Styles.BlockTitle>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: 24 }}>
          <VolumeTransactions />
        </Grid>
        <Grid item xs={12}>
          <IncomingTransactions />
        </Grid>
      </Grid>
    </Styles.BlockWrapper>
  );
};

export default TransactionStatistics;
