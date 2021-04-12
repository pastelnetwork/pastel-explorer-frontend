import styled from 'styled-components/macro';
import { spacing } from '@material-ui/system';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from '@material-ui/core';

export const Card = styled(MuiCard)(spacing);

export const Typography = styled(MuiTypography)(spacing);

export const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;
