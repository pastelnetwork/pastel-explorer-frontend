import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

export const TitleRow = styled(Grid)`
  width: 100%;
  margin-top: 53px;
  padding-bottom: 0 !important;

  &.subTitle {
    padding-top: 0 !important;
  }
`;

export const Title = styled(Typography)`
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
