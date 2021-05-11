import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

import VolumeTransactionsChart from './VolumeTransactionsChart/VolumeTransactionsChart';
import IncomingTransactionsChart from './IncomingTransactionsChart/IncomingTransactionsChart';

const TransactionStatistics: React.FC = () => {
  return (
    <>
      <Header title="Transactions Statistics" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <VolumeTransactionsChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <IncomingTransactionsChart />
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionStatistics;
