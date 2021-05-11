import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

import HashrateChart from './HashrateChart/HashrateChart';

const NetworkStatistics: React.FC = () => {
  return (
    <>
      <Header title="Network Statistics" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <HashrateChart />
        </Grid>
      </Grid>
    </>
  );
};

export default NetworkStatistics;
