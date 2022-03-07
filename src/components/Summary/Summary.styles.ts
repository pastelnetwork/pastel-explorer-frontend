import styled from 'styled-components/macro';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
  // Grid as MuiGrid,
} from '@material-ui/core';
import { rgba } from 'polished';

// export const Grid = styled(MuiGrid)`
//   margin: 0;
//   width: 100%;
//   background-color: ${props => props.theme.palette.background.paper};
// `;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px 12px 24px;
  background: ${props => props.theme.palette.background.paper};
`;

export const Card = styled(MuiCard)`
  width: calc(20% - 10px);
  min-height: 150px;
  margin: 0 12px 12px 0;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  overflow: unset;
  background: ${props => props.theme.sidebar.menu.background};

  &:nth-child(5),
  &:nth-child(10) {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.down('lg')} {
    width: calc(25% - 10px);

    &:nth-child(4),
    &:nth-child(8) {
      margin-right: 0;
    }

    &:nth-child(5),
    &:nth-child(10) {
      margin-right: 12px;
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    width: calc(50% - 10px);

    &:nth-child(5),
    &:nth-child(10) {
      margin-right: 12px;
    }

    &:nth-child(even) {
      margin-right: 0;
    }
  }

  ${props => props.theme.breakpoints.down('xs')} {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
`;

export const Typography = styled(MuiTypography)`
  color: ${props => props.theme.sidebar.menu.default};
`;

export const Values = styled.div`
  margin-left: ${props => props.theme.spacing(2)}px;
  margin-right: ${props => props.theme.spacing(2)}px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.card.color};
`;

export const CardContent = styled(MuiCardContent)`
  text-align: center;
  position: relative;
  margin-top: 0;
  padding: 20px;

  &:last-child {
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }
`;

export const Percentage = styled(MuiTypography)<{
  percentagecolor: string;
  mb: number;
}>`
  margin-top: ${props => props.theme.spacing(3)}px;
  font-size: 0.8rem;
  color: ${props => props.theme.sidebar.menu.default};

  span {
    display: inline-block;
    margin-top: ${props => props.theme.spacing(1)}px;
    color: ${props => props.theme.palette.text.secondary};
    background: ${props => rgba(props.percentagecolor, 0.2)};
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 16px;
  }
`;
