import styled from 'styled-components/macro';

import { Card as MuiCard } from '@material-ui/core';
import { spacing } from '@material-ui/system';

export const Card = styled(MuiCard)(spacing);

export const Spacer = styled.div(spacing);

export const ChartWrapper = styled.div`
  height: 300px;
`;
