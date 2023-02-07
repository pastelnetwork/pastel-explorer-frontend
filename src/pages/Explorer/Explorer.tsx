import * as React from 'react';
import { Grid } from '@material-ui/core';

import * as ROUTES from '@utils/constants/routes';

import * as Styles from './Explorer.styles';
import ExplorerMap from './ExplorerMap/ExplorerMap';
import SupernodeStatistics from './SupernodeStatistics/SupernodeStatistics';
import LatestTransactionsRT from './LatestTransactionsRT';
import LatestBlocks from './LatestBlocks';

const Explorer: React.FC = () => {
  return (
    <Styles.ExplorerWrapper>
      <Styles.Gird>
        <Styles.ExplorerMapColumn>
          <ExplorerMap />
        </Styles.ExplorerMapColumn>
        <Styles.SupernodeColumn>
          <SupernodeStatistics link={ROUTES.SUPERNODES} />
        </Styles.SupernodeColumn>
      </Styles.Gird>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} md={6} className="left">
          <LatestBlocks />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} md={6} className="right">
          <LatestTransactionsRT />
        </Styles.GirdStyle>
      </Grid>
    </Styles.ExplorerWrapper>
  );
};

export default Explorer;
