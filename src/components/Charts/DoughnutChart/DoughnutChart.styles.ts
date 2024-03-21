import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { Card as MuiCard, CardContent as MuiCardContent, Grid } from '@mui/material';

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
    padding-bottom: 8px;
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
  height: 273px;
  position: relative;
  padding: 20px;

  @media (min-width: 960px) {
    padding: 10px 20px;
    height: 273px;

    .echarts-for-react {
      height: 253px !important;
    }
  }

  @media (min-width: 1280px) {
    padding: 20px;
    height: 332px;
    height: 300px !important;
  }

  @media (max-width: 959px) {
    height: 273px;

    .echarts-for-react {
      height: 234px !important;
    }
  }

  @media (max-width: 600px) {
    height: 190px;
    padding: 0;

    &:last-child {
      height: auto;
    }

    .echarts-for-react {
      height: 190px !important;
    }
  }

  .chartjs-render-monitor {
    position: relative;
  }

  canvas {
    position: relative;
    z-index: 1;
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

export const StakingWrapper = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 60px;
  font-weight: 600;
  line-height: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    padding-top: 10px;
    font-size: 32px;
  }
`;

export const StakingTitle = styled.div`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;

  @media (max-width: 600px) {
    margin-top: 5px;
    font-size: 16px;
  }
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
`;
