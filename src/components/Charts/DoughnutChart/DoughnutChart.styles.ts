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

  h4:not(.MuiTypography-h4) {
    margin: 0;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 16px;
    background: ${props => props.theme.card.titleColor};
  }
`;

export const CardContent = styled(MuiCardContent)`
  @media (min-width: 960px) {
    max-height: 356px;
  }

  &:last-child {
    padding-top: 0;
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    & > .MuiGrid-root {
      align-items: center;
    }
  }

  ${props => props.theme.breakpoints.down(600)} {
    &:last-child {
      padding-top: 12px;
    }
  }
`;

export const ChartWrapper = styled(Grid)`
  height: 160px;
  position: relative;

  @media (min-width: 960px) {
    padding: 10px 40px;
    height: 332px;
  }

  @media (min-width: 1280px) {
    padding: 20px;
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

export const StakingAPRChart = styled.div`
  padding: 20px;

  .echarts-for-react {
    height: 250px !important;
  }
`;
