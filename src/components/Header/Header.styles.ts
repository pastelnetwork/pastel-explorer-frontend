import styled from 'styled-components';
import { Divider as MuiDivider, Typography as MuiTypography } from '@mui/material';

export const Divider = styled(MuiDivider);

export const Typography = styled(MuiTypography);

export const Container = styled.div`
  margin-bottom: 20px;

  .MuiGrid-container {
    width: 100%;
    margin: 0;
  }
`;
