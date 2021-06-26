import styled from 'styled-components/macro';
import { spacing } from '@material-ui/system';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
  Grid as MuiGrid,
} from '@material-ui/core';
import { rgba } from 'polished';

export const Grid = styled(MuiGrid)`
  margin: 0;
  width: 100%;
  background-color: ${props => props.theme.palette.background.paper};
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
  background-color: ${props => props.theme.palette.background.default};
  border: 2px solid #efedea;
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }
`;

export const Percentage = styled(MuiTypography)<{
  percentagecolor: string;
  mb: number;
}>`
  font-size: 0.8rem;

  span {
    color: ${props => props.theme.palette.text.secondary};
    background: ${props => rgba(props.percentagecolor, 0.1)};
    padding: 2px 6px;
    border-radius: 3px;
    margin-right: ${props => props.theme.spacing(1)}px;
  }
`;
