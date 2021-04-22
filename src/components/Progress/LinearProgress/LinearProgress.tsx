import * as React from 'react';
import { Grid } from '@material-ui/core';

import * as Styles from './LinearProgress.styles';

interface LinearProgressProps {
  value: number;
  description?: string;
}

const LinearProgressComponent: React.FC<LinearProgressProps> = ({ value, description }) => {
  return (
    <Grid container alignItems="center" justify="center">
      <Styles.LinearProgress value={value} variant="determinate" color="primary" />
      {description && <Styles.Typography>{description}</Styles.Typography>}
    </Grid>
  );
};

export default LinearProgressComponent;
