import styled from 'styled-components/macro';

import { Card as MuiCard, CardContent as MuiCardContent } from '@material-ui/core';

export const MapContainer = styled.div`
  height: 340px;
`;

export const Card = styled(MuiCard)`
  background: transparent;
  box-shadow: none;

  h4 {
    margin: 0;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 16px;
    background: ${props => props.theme.card.titleColor};
  }
`;

export const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-top: 0;
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;
