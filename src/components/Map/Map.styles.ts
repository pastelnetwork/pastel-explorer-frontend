import styled from 'styled-components/macro';

import { Card as MuiCard, CardContent as MuiCardContent } from '@material-ui/core';
import { spacing } from '@material-ui/system';

export const MapContainer = styled.div`
  height: 345px;
`;

export const Card = styled(MuiCard)(spacing);

export const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-top: 0;
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;
