import styled from 'styled-components';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from '@material-ui/core';
import { rgba } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px 12px 12px;
  background: ${props => props.theme.palette.background.paper};
`;

export const Card = styled(MuiCard)`
  width: calc(25% - 10px);
  margin: 0 12px 12px 0;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  overflow: unset;
  background: ${props => props.theme.sidebar.menu.background};

  &:nth-child(9),
  &:nth-child(10) {
    width: calc(50% - 10px);
  }

  &:nth-child(4),
  &:nth-child(8),
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

  ${props => props.theme.breakpoints.down('md')} {
    width: calc(33.33% - 10px);

    &:nth-child(3),
    &:nth-child(6),
    &:nth-child(9) {
      margin-right: 0;
    }

    &:nth-child(5),
    &:nth-child(10),
    &:nth-child(4),
    &:nth-child(8) {
      margin-right: 12px;
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    width: calc(50% - 10px);

    &:nth-child(5),
    &:nth-child(10),
    &:nth-child(3),
    &:nth-child(6),
    &:nth-child(9) {
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

  .echarts-for-react {
    height: 100px !important;
  }
`;

export const ValueWrapper = styled.div`
  text-align: left;
`;

export const PercentageWrapper = styled.div`
  text-align: right;
`;

export const Typography = styled(MuiTypography)`
  color: ${props => props.theme.sidebar.menu.default};
`;

export const Values = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.card.color};
`;

export const CardContent = styled(MuiCardContent)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0;
  padding: 15px 15px 0;
  text-align: center;

  &:last-child {
    padding-bottom: 15px;
  }
`;

export const Percentage = styled(MuiTypography)<{
  percentagecolor: string;
  mb: number;
}>`
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

export const LineChartWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 0 20px 20px;
`;

export const LineChartTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.sidebar.menu.default};
  text-align: center;
`;
