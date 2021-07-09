import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

// import VolumeTransactionsChart from './VolumeTransactionsChart/VolumeTransactionsChart';
// import IncomingTransactionsChart from './IncomingTransactionsChart/IncomingTransactionsChart';
import IncomingTransactions from './IncomingTransactions';
import VolumeTransactions from './VolumeTransactions';

const TransactionStatistics: React.FC = () => {
  return (
    <>
      <Header title="Transactions Statistics" />
      <Grid container spacing={6}>
        <Grid item xs={12}>
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
