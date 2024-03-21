import * as React from 'react';
import { Grid } from '@mui/material';

import * as Styles from './LinearProgress.styles';

interface LinearProgressProps {
  value: number;
  description?: string;
}

const LinearProgressComponent: React.FC<LinearProgressProps> = ({ value, description }) => {
  return (
    <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Styles.LinearProgress value={value} variant="determinate" color="primary" />
      {description && <Styles.Typography>{description}</Styles.Typography>}
    </Grid>
  );
};

LinearProgressComponent.defaultProps = {
  description: '',
}

export default LinearProgressComponent;
