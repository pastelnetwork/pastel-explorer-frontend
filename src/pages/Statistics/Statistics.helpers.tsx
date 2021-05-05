import * as React from 'react';
import { Grid, Tooltip, Typography } from '@material-ui/core';

import * as Styles from './Statistics.styles';

type ZoomOption = {
  name: string;
  tooltip: string;
  timestampDifference: number;
};

const generateZoomOptions = (
  zoomOptions: Array<ZoomOption>,
  setZoomOption: React.Dispatch<React.SetStateAction<ZoomOption>>,
) => (
  <Styles.ZoomContainer>
    <Typography variant="caption">Zoom</Typography>
    {zoomOptions.map(currentZoomOption => (
      <Tooltip key={currentZoomOption.name} title={currentZoomOption.tooltip} arrow>
        <Styles.ZoomElement onClick={() => setZoomOption(currentZoomOption)}>
          {currentZoomOption.name}
        </Styles.ZoomElement>
      </Tooltip>
    ))}
  </Styles.ZoomContainer>
);

export const generateTitleWithZoomOptions = (
  zoomOptions: Array<ZoomOption>,
  setZoomOption: React.Dispatch<React.SetStateAction<ZoomOption>>,
  title: string,
) => {
  return (
    <Grid container justify="space-between" spacing={2}>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>{generateZoomOptions(zoomOptions, setZoomOption)}</Grid>
    </Grid>
  );
};
