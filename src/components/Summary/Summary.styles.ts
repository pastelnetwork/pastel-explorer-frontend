import styled from 'styled-components/macro';
import { spacing } from '@material-ui/system';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
  Grid as MuiGrid,
  darken,
} from '@material-ui/core';
import { rgba } from 'polished';

import themeVariant from '@theme/variants';

export const Grid = styled(MuiGrid)`
  margin: 0;
  width: 100%;
`;

export const Card = styled(MuiCard)(spacing);

export const Typography = styled(MuiTypography)(spacing);

export const Values = styled.div`
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardContent = styled(MuiCardContent)`
  position: relative;
  padding: 8px;

  cursor: pointer;
  transition: background-color 0.3s ease-out;

  &:last-child {
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }

  &:hover {
    background-color: ${darken(themeVariant.palette.background.paper, 0.1)};
  }
`;

export const Percentage = styled(MuiTypography)<{
  percentagecolor: string;
  mb: number;
}>`
  font-size: 0.8rem;

  span {
    color: ${props => props.percentagecolor};
    background: ${props => rgba(props.percentagecolor, 0.1)};
    padding: 2px 6px;
    border-radius: 3px;
    margin-right: ${props => props.theme.spacing(1)}px;
  }
`;
