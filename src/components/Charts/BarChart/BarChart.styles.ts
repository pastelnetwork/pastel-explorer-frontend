import styled from 'styled-components/macro';

import { CardContent as MuiCardContent } from '@material-ui/core';

export const CHART_HEIGHT = 200;

export const ChartWrapper = styled.div<{ height: number | undefined }>`
  height: ${({ height }) => height || CHART_HEIGHT}px;
`;

export const CardContent = styled(MuiCardContent)`
  padding: 0;
`;
