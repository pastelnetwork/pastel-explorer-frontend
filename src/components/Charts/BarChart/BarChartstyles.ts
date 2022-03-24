import styled from 'styled-components/macro';

import themeVariant from '@theme/variants';

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
  Grid,
} from '@material-ui/core';

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

  @media screen and (min-width: 1280px) and (max-width: 1440px) {
    min-height: 394px;
  }
`;

export const CardContent = styled(MuiCardContent)`
  ${props => props.theme.breakpoints.up(1280)} {
    max-height: 414px;
  }

  ${props => props.theme.breakpoints.up(1440)} {
    max-height: 356px;
  }

  &:last-child {
    padding-top: 0;
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }
`;

export const ChartWrapper = styled(Grid)`
  position: relative;

  @media (min-width: 960px) {
    padding: 10px 40px;
  }

  @media (min-width: 1280px) {
    padding: 30px 20px 5px;
  }

  .chartjs-render-monitor {
    position: relative;
  }

  canvas {
    position: relative;
    z-index: 1;
    }
  }
`;

export const DoughnutInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
  width: auto;
  transform: translateX(-50%);
`;

export const TableRow = styled(MuiTableRow)`
  height: 42px;

  &:last-child th,
  &:last-child td {
    border-bottom: 0;
  }
`;

export const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

export const GreenText = styled.span`
  color: ${() => themeVariant.custom.green.main};
`;

export const RedText = styled.span`
  color: ${() => themeVariant.custom.red.main};
`;

export const ChartSVGWrapper = styled.div`
  position: relative;

  .chart-label,
  .chart-label-percent,
  .chart-label-value {
    fill: ${props => props.theme.sidebar.closeIcon};
    font-size: 14px;
  }

  @media (max-width: 1440px) {
    margin-top: 20px;
  }
`;

export const ChartSVGTooltip = styled.div`
  position: fixed;
  display: none;
  padding: 10px;
  background: ${props => props.theme.sidebar.menu.subMenu.background};
  box-shadow: 1px 2px 40px 0 rgb(0 0 0 / 9%);
  border-radius: 8px;
  color: ${props => props.theme.sidebar.menu.default};
  z-index: 100;

  .tooltip-country {
    font-size: 16px;
    font-weight: 600;
  }

  .tooltip-info {
    font-size: 14px;
    font-weight: 400;
  }
`;
