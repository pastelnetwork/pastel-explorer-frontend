import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

import HashrateChart from './HashrateChart/HashrateChart';
import VolumeTransactionsChart from './VolumeTransactionsChart/VolumeTransactionsChart';
import MempoolInfoChart from './MempoolInfoChart/MempoolInfoChart';

const Statistics: React.FC = () => (
  <>
    <Header title="Statistics" />
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <VolumeTransactionsChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <HashrateChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <MempoolInfoChart />
      </Grid>
    </Grid>
  </>
);

export default Statistics;
