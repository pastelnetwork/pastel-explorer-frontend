import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@material-ui/core';

import Summary from '../../components/Summary/Summary';

import * as Styles from './Explorer.styles';

const Default: React.FC = () => {
  return (
    <>
      <Helmet title="Explorer" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Styles.Typography variant="h3" gutterBottom>
            Explorer
          </Styles.Typography>
        </Grid>
        <Grid item />
      </Grid>
      <Styles.Divider my={6} />
      <Summary />
    </>
  );
};

export default Default;
