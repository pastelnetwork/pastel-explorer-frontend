import styled from 'styled-components/macro';

import { Card as MuiCard, CardContent as MuiCardContent } from '@material-ui/core';

export const MapContainer = styled.div`
  height: 340px;
`;

export const Card = styled(MuiCard)`
  background: transparent;
  box-shadow: none;

  h4 {
    padding-left: 16px;
  }
`;

export const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-top: 0;
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;
