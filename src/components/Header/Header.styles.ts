import styled from 'styled-components';
import { Divider as MuiDivider, Typography as MuiTypography } from '@mui/material';

export const Divider = styled(MuiDivider);

export const Typography = styled(MuiTypography);

export const Container = styled.div`
  margin-bottom: ${props => props.theme.spacing(5)}px;
`;
