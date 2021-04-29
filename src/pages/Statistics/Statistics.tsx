import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

const Statistics: React.FC = () => (
  <>
    <Header title="Statistics" />
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        Chart
      </Grid>
      <Grid item xs={12} lg={6}>
        Chart
      </Grid>
    </Grid>
  </>
);

export default Statistics;
