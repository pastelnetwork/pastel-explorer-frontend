import styled from 'styled-components/macro';
import {
  LinearProgress as MuiLinearProgress,
  Typography as MuiTypography,
} from '@material-ui/core';

export const LinearProgress = styled(MuiLinearProgress)`
  height: 14px;
  width: 180px;
  border-radius: 3px;
`;

export const Typography = styled(MuiTypography)`
  margin-left: 3px;
  font-size: 0.9rem;
`;
