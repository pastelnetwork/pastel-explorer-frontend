import * as React from 'react';

import { Grid } from '@material-ui/core';

import LineChart from '@components/Charts/LineChart/LineChart';

import { generateTitleWithZoomOptions } from '../Statistics.helpers';
import { generateVolumeOfTransactionsData, zoomOptions } from './MempoolInfoChart.helpers';

const MempoolInfoChart: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [zoomOption, setZoomOption] = React.useState(zoomOptions[0]);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [zoomOption]);

  return (
    <Grid item>
      <LineChart
        title={generateTitleWithZoomOptions(
          zoomOptions,
          setZoomOption,
          `Mempool by vBytes (sat/vBytes) (last ${zoomOption.tooltip})`,
        )}
        data={generateVolumeOfTransactionsData()}
        isLoading={isLoading}
      />
    </Grid>
  );
};

export default MempoolInfoChart;
