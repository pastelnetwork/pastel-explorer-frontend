import * as React from 'react';
import { Tooltip, Typography } from '@material-ui/core';

import * as Styles from './Statistics.styles';

type ZoomOption = {
  name: string;
  tooltip: string;
  timestampDifference: number;
};

export const generateZoomOptions = (
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
