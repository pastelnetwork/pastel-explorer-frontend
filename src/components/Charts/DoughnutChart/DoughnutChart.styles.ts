import styled from 'styled-components/macro';
import { spacing } from '@material-ui/system';

import themeVariant from '@theme/variants';

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from '@material-ui/core';

export const Card = styled(MuiCard)(spacing);

export const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(2)}px;
  }
`;

export const ChartWrapper = styled.div`
  height: 120px;
  position: relative;

  .chartjs-render-monitor {
    position: relative;
  }
`;

export const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
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
