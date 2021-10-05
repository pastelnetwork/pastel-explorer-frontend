import { Grid } from '@material-ui/core';

import IncomingTransactions from './IncomingTransactions';
import VolumeTransactions from './VolumeTransactions';

const TransactionStatistics: React.FC = () => {
  return (
    <div className="transaction-statistics-block">
      <h4>Transactions Statistics</h4>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: 24 }}>
          <VolumeTransactions />
        </Grid>
        <Grid item xs={12}>
          <IncomingTransactions />
        </Grid>
      </Grid>
    </div>
  );
};

export default TransactionStatistics;
