import styled from 'styled-components';
import {
  LinearProgress as MuiLinearProgress,
  Typography as MuiTypography,
} from '@mui/material';

export const LinearProgress = styled(MuiLinearProgress)`
  height: 14px;
  width: 120px;
  border-radius: 3px;
`;

export const Typography = styled(MuiTypography)`
  margin-left: 3px;
  font-size: 0.9rem;
  width: 20px;
`;
