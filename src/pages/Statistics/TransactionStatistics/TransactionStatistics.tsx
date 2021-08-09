import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

import IncomingTransactions from './IncomingTransactions';
import VolumeTransactions from './VolumeTransactions';

const TransactionStatistics: React.FC = () => {
  return (
    <>
      <Header title="Transactions Statistics" />
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: 24 }}>
          <VolumeTransactions />
        </Grid>
        <Grid item xs={12}>
          <IncomingTransactions />
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionStatistics;
