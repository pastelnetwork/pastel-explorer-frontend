import styled from 'styled-components/macro';
import { Divider as MuiDivider, Typography as MuiTypography } from '@material-ui/core';
import { spacing } from '@material-ui/system';

export const Divider = styled(MuiDivider)(spacing);

export const Typography = styled(MuiTypography)(spacing);

export const Container = styled.div`
  margin-bottom: ${props => props.theme.spacing(8)}px;
`;
